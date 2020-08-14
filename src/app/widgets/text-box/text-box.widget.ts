import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Widget } from 'src/model/widget.model';
import { BaseWidget } from '../base.widget';
import { TextBoxWidgetConfig } from 'src/model/widget-config';
import { PaginatedResult } from 'src/model/paginated-result.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from 'src/app/services/app-data.service';
import { transform } from '../util';

@Component({
  selector: 'widget-text-box',
  templateUrl: './text-box.widget.html',
  styleUrls: ['./text-box.widget.scss']
})
export class TextBoxWidget extends BaseWidget<TextBoxWidgetConfig> {
  @Input('widget') _widget: Widget;
  fields = ['title', 'sub_title', 'content', 'image', 'button_text', 'button_url'];
  data: any = {}
  
  get type(){
    return this.config.text_box_type;
  }

  get map(){
    return this.config.map || {}
  }

  getData(): Observable<any | null>{
    if(this.config.data){
      return of(this.config.data);
    }
    if(this.widget.data_type === 'content'){
      return of(this.widget);
    }
    if(this.widget.data_type === 'selected_data'){
      return this.dataService.currentPageResponse.pipe(
        map(page=> page?.selected_data)
      )
    }
    if(this.widget.data_type === 'menu'){
      return this.http.get(`${environment.apiRoot}/api/widget/${this.widget.id}`).pipe(
        map((response: any)=> response.items as any[])
      )
    }

    if(this.widget.data_type === 'data'){
      return this.http.get<PaginatedResult<any[]>>(`${environment.apiRoot}/api/widget/${this.widget.id}?page[number]=1&page[size]=1`).pipe(
        map(response=>{
          return response.data[0];
        })
      );
    }
    return of({});
  }

  ngOnInit() {
    this.getData().subscribe(data=>{
      if(data){
        this.data = transform(data, this.map, this.fields);
        this.status = 'loaded';
      } else {
       this.status = 'loading'; 
      }
      this.cdr.detectChanges();
    });
  }
  constructor(
    private http: HttpClient,
    private dataService: AppDataService,
    private cdr: ChangeDetectorRef
  ) { 
    super();
  }

  

}
