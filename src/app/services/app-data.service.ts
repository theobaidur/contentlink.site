import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InitialSetting } from '../../model/initial-setting.model';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { tError } from '../util/toast';
import { Meta, Title } from '@angular/platform-browser';
import { Page } from 'src/model/page.model';
@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  initialSetting = new BehaviorSubject<InitialSetting>(null);
  appReady = new BehaviorSubject(false);
  appBusy = new BehaviorSubject(true);
  currentPageResponse = new BehaviorSubject<Page>(null);
  
  constructor(
    private http: HttpClient,
    private meta: Meta,
    private title: Title
  ) { 
    this.http.get<InitialSetting>(`${environment.apiRoot}/api/data/initial-data`)
      .subscribe(response=>{
        this.initialSetting.next(response);
        this.appReady.next(true);
        if(response.title){
          this.title.setTitle(response.title);
        }
      }, err=>{
        tError('Something went wrong', 'Ops!');
        this.appReady.next(true);
      });

      this.appBusy.subscribe(busy=>{
        if(document.getElementById('busy')){
          document.getElementById('busy').style.display = busy ? 'block' : 'none';
        }
      });
  }
}
