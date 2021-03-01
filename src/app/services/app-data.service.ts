import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InitialSetting } from '../../model/initial-setting.model';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { tError } from '../util/toast';
import { Page } from 'src/model/page.model';
import { DynamicResponse, PageWidget } from '../../json';
import { Widget } from 'src/model/widget.model';
import { cleanClientPrefix } from '../util/helpers';
import { map, filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  initialSetting = new BehaviorSubject<InitialSetting>(null);
  appReady = new BehaviorSubject(false);
  appBusy = new BehaviorSubject(true);
  currentPageResponse = new BehaviorSubject<Page>(null);
  data = new BehaviorSubject<DynamicResponse>(null);
  constructor(
    private http: HttpClient
  ) {
    const url = `${environment.apiRoot}/api/data/cpc`;
    this.http.get<DynamicResponse>(url).subscribe(response=>{
      this.data.next(response);
      this.appReady.next(true);
      this.appBusy.next(false);
    }, ()=>{
      tError('Something went wrong', 'Ops!');
      this.appBusy.next(false);
      this.appReady.next(true);
    });

      this.appBusy.subscribe(busy=>{
        if(document.getElementById('busy')){
          document.getElementById('busy').style.display = busy ? 'block' : 'none';
        }
      });
  }

  getWidgetDataList<T = any>({entity, order_by_field}: PageWidget): Observable<T[]>{
    return this.data.pipe(
      filter(data => !!data),
      map(data => {
        const {system_entity_name} = data.entities.data.find(e=>e.entityid === entity) || {};
        const orderByField = data.entity_fields.data.find(e=>order_by_field && e.entity_fieldid === order_by_field);
        let orderByFieldName = '';
        if(orderByField){
          orderByFieldName = cleanClientPrefix(orderByField.field_name);
        }
        let response = [];
        if(system_entity_name){
          const name = cleanClientPrefix(system_entity_name);
          response = data?.[name]?.data || [];
        }
        if(orderByFieldName){
          response = response.sort((a, b)=>{
            const aVal = +(a?.[orderByFieldName] || '0');
            const bVal = +(b?.[orderByFieldName] || '0');
            return aVal - bVal;
          });
        }
        return response;
      })
    );
  }

  getWidgetDataDetail<T = any>(widget: PageWidget, id: string): Observable<T>{
    return this.getWidgetDataList(widget).pipe(
      map(list=>list.find(e=>e.id === id))
    )
  }
}
