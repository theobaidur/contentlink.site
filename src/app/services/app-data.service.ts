import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InitialSetting } from '../../model/initial-setting.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { tError } from '../util/toast';
import { Title } from '@angular/platform-browser';
import { Page } from 'src/model/page.model';
import { DynamicResponse } from '../../json';
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
    private http: HttpClient,
    private title: Title
  ) {
    this.title.setTitle('MERP Systems');
    const headers = new HttpHeaders({
      'x-functions-key': environment.authKey
    });
    const url = `${environment.dynamicRoot}/api/getCMSMetaData`;
    this.http.get<DynamicResponse>(url, {
      headers
    }).subscribe(response=>{
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
}
