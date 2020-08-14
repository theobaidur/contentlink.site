import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Page } from './../../../model/page.model';
@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.scss']
})
export class PageBaseComponent implements OnInit {
  page: Page;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppDataService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.appService.currentPageResponse.subscribe(response=>{
      this.page = response;
    });

    this.route.params
    .pipe(
      tap(()=>this.appService.appBusy.next(true)),
      switchMap(params=>{
        this.appService.currentPageResponse.next(null);
        const val = this.appService.initialSetting.getValue();
        let parts: string[] = [];
        if(params.page && params.id){
          parts = [params.page, params.model, params.id];
        } else if(params.page){
          parts = [params.page];
        } else {
          const redirect = `/p/${val.default_page}`;
          return of({redirect})
        }
        return this.http.get(`${environment.apiRoot}/api/page/${parts.join('/')}`);
      }),
      tap(()=>this.appService.appBusy.next(false))
    )
    .subscribe((result: Page)=>{
      if(result.redirect){
        this.router.navigate([result.redirect]);
      } else {
        if(result && result.page_config){
          try{
            result.page_config_parsed = JSON.parse(result.page_config || '{}');
          } catch{
            result.page_config_parsed = {};
          }
        }
        if(result && result.widgets && Array.isArray(result.widgets)){
          result.widgets.forEach(w=>{
            try{
              w.widget_config_parsed = JSON.parse(w.widget_config || '{}');
            } catch{
              w.widget_config_parsed = {};
            }
          });
        }
        this.appService.currentPageResponse.next(result);
      }
    }, (err)=>{
      this.appService.appBusy.next(false);
    });
  }

}
