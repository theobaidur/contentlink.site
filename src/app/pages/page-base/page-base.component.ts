import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { map, switchMap } from 'rxjs/operators';
import { Page } from 'src/json';
@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.scss']
})
export class PageBaseComponent implements OnInit {
  page: Page;
  noMatchFound = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppDataService  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap(({page})=>this.appService.data.pipe(
        map(response=> response?.pages?.data?.find(p=>{
          return page ? `/${page}` === p.page_url : !!p.home_page;
        }))
      ))
    )
    .subscribe((result: Page)=>{
      if(result){
        this.page = {...result};
      } else {
        this.router.navigate(['/']);
      }
    }, _=>{
      this.router.navigate(['/']);
    });
  }

}
