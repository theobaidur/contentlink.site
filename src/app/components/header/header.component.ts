import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { SettingsManagerService } from 'src/app/services/settings-manager.service';
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
    private appData: AppDataService,
    public settings: SettingsManagerService
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
    return this.settings.menu('primary_menu');
  }

  get defaultPageUrl(){
    return this.appData.data.pipe(
      map(r=>r?.pages?.data?.find(p=>!!p.home_page)?.page_url || '/')
    )
  }
}
