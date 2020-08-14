import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Widget } from 'src/model/widget.model';
import { BaseWidget } from '../base.widget';
import { MenuWidgetConfig } from 'src/model/widget-config';
import { PaginatedResult } from 'src/model/paginated-result.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'widget-menu',
  templateUrl: './menu.widget.html',
  styleUrls: ['./menu.widget.scss']
})
export class MenuWidget extends BaseWidget<MenuWidgetConfig> {
  @Input('widget') _widget: Widget;
  fields = ['image', 'title', 'sub_title'];
  _items: any[] = [];
  current_page = 0;
  last_page = Infinity;
  get type(){
    return this.config.card_type;
  }

  get map(){
    return this.config.map || {}
  }

  get items(){
    if(this.config.max_item && this.config.max_item > 0){
      return this._items.slice(0, this.config.max_item);
    }
    return this._items;
  }

  get hasMoreItems(){
    if(this.widget.data_type === 'data' && this.config.paginate){
      return this.current_page < this.last_page;
    }
    return false;
  }

  loadNextPage(){
    const page_number = this.current_page+1;
    this.loading = true;
    return this.http.get<PaginatedResult<any[]>>(`${environment.apiRoot}/api/widget/${this.widget.id}?page[number]=${page_number}&page[size]=5`).pipe(
      map(response=>{
        this.current_page = response.current_page;
        this.last_page = response.last_page;
        return response.data;
      })
    )
  }

  getItems(): Observable<any[] | null>{
    if(this.config.items && Array.isArray(this.config.items)){
      return of(this.config.items);
    }
    if(this.widget.data_type === 'content'){
      return of([this.widget]);
    }
    if(this.widget.data_type === 'selected_data'){
      return this.dataService.currentPageResponse.pipe(
        map(page=> [page.selected_data])
      )
    }
    if(this.widget.data_type === 'menu'){
      return this.http.get(`${environment.apiRoot}/api/widget/${this.widget.id}`).pipe(
        map((response: any)=> response.items as any[])
      )
    }

    if(this.widget.data_type === 'data'){
      return this.loadNextPage();
    }
    return of([]);
  }

  loadMore(){
    this.loadNextPage().subscribe(list=>{
      this.loading = false;
      this._items = [...this._items, ...list];
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.getItems().subscribe(result=>{
      if(result && Array.isArray(result)){
        this._items = [...this._items, ...result];
        this.status = 'loaded';
      } else { 
        this.status = 'loading';
      }
      this.loading = false;
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
