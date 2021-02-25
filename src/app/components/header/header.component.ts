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
  collapsed = true;
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
    return item?.url?.startsWith('http');
  }

  get menuItems(){
    return this.appData.data.pipe(
      map(response=>{
        const menuId = response.menus?.data?.[0]?.menuid;
        return (response.menu_items.data || []).filter(({menu})=> menu === menuId).map(item=>{
          if(item.target_url === Target.Page){
            const url = (response?.pages?.data || []).find(({pageid})=> pageid === item.page)?.page_url || '';
            item.url = url;
          }
          return item;
        })
      })
    )
  }

  get defaultPageUrl(){
    return this.appData.data.pipe(
      map(r=>r?.pages?.data?.find(p=>!!p.home_page)?.page_url || '/')
    )
  }
}
