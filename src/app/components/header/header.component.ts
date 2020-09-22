import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { filter, map } from 'rxjs/operators';
import { MenuItem, Target } from 'src/json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed = false;
  constructor(
    private appData: AppDataService
  ) { }

  ngOnInit(): void {
  }

  get icon(){
    return this.appData.initialSetting.pipe(
      filter(data => data && !!data.logo),
      map(data=> data.logo)
    )
  }

  get title(){
    return this.appData.initialSetting.pipe(
      filter(data => data && !!data.title),
      map(data=> data.title)
    )
  }

  isExternal(item: MenuItem){
    return item?.URL?.startsWith('http');
  }

  get menuItems(){
    return this.appData.data.pipe(
      map(response=>{
        return (response?.Menus?.[0]?.MenuItem || []).map(item=>{
          if(item?.TargetURL === Target.Page){
            const url = this.appData.data.getValue()?.Pages?.find(p=>p.Id === item.page)?.PageURL || '';
            item.URL = url;
          }
          return item;
        }).sort((a, b)=>a.Order - b.Order);
      })
    )
  }

  get defaultPageUrl(){
    return this.appData.data.pipe(
      map(r=>r?.Pages?.find(p=>p.HomePage === 'True')?.PageURL || '/')
    )
  }
}
