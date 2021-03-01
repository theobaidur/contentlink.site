import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Settings } from '../../json';
import { appendApiRoot } from '../util/helpers';
import { AppDataService } from './app-data.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsManagerService{
  settings = new BehaviorSubject<{[key: string]: Settings}>({});

  constructor(
    private dataService: AppDataService,
    private Title: Title
  ){
    this.dataService.data.pipe(
      filter(data=> !!(data && data.settingses)),
      map(({settingses})=>settingses)
    ).subscribe(async list=>{
      if(list && Array.isArray(list.data)){
        this.settings.next(
          list.data.reduce<any>((obj, {name, ...rest})=>{
            obj[name] = {...rest, name};
            return obj;
          }, {})
        );
      }
    });

    this.settings.subscribe(({favicon, title, additional_css})=>{
      if(title){
        this.Title.setTitle(title?.value);
      }
      if(favicon){
        document.querySelector<HTMLLinkElement>('#favicon').href = appendApiRoot(favicon.image);
      }

      if(additional_css){
        const style = document.createElement('style');
        fetch(appendApiRoot(additional_css.file))
          .then(r=>r.text())
          .then(css=>{
            style.innerHTML = css;
            document.head.appendChild(style);
          });

      }
    });
  }

  get(key: string){
    return this.settings.pipe(
      filter(setting=> Object.keys(setting || {}).length > 0),
      map(setting=>setting[key])
    )
  }

  menu(location: string){
    return this.get(location)
               .pipe(
                 filter(settings=> !!(settings && settings.menu)),
                 switchMap(({menu: parent})=>this.dataService.data.pipe(
                  map(data=>data?.menu_items?.data?.filter(({menu})=>menu === parent) || [])
                ))
               )
  }
}
