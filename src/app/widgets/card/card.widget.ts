import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Widget } from 'src/model/widget.model';
import { BaseWidget } from '../base.widget';
import { CardWidgetConfig } from 'src/model/widget-config';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from 'src/model/paginated-result.model';
import { HttpClient } from '@angular/common/http';
import { AppDataService } from 'src/app/services/app-data.service';
import { Router } from '@angular/router';
import { transform } from 'lodash';
import { src } from '../util';
import { tns } from 'tiny-slider';

@Component({
  selector: 'widget-card',
  templateUrl: './card.widget.html',
  styleUrls: ['./card.widget.scss']
})
export class CardWidget extends BaseWidget<CardWidgetConfig> {
  @Input('widget') _widget: Widget;
  fields = ['icon_class', 'image', 'title', 'sub_title', 'text', 'button_text', 'button_url'];
  _cards: any[] = [];
  current_page = 0;
  last_page = Infinity;
  get type(){
    return this.config.card_type;
  }

  get map(){
    return this.config.map || {}
  }

  get cards(){
    if(this.config.max_item && this.config.max_item > 0){
      return this._cards.slice(0, this.config.max_item);
    }
    return this._cards;
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
    return this.http.get<PaginatedResult<any[]>>(`${environment.apiRoot}/api/widget/${this.widget.id}?page[number]=${page_number}&page[size]=15`).pipe(
      map(response=>{
        this.current_page = response.current_page;
        this.last_page = response.last_page;
        return response.data;
      })
    )
  }

  getCards(): Observable<any[] | null>{
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
      this._cards = [...this._cards, ...list];
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.getCards().subscribe(result=>{
      if(result && Array.isArray(result)){
        this._cards = [...this._cards, ...result];
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
