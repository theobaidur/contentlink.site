import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { filter, map } from 'rxjs/operators';

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

  get menuItems(){
    return this.appData.initialSetting.pipe(
      filter(data => data?.main_menu?.length > 0),
      map(data=> data.main_menu)
    )
  }

  get defaultPageUrl(){
    return this.appData.initialSetting.pipe(
      filter(data => !!data?.default_page),
      map(data=> `/p/${data.default_page}`)
    )
  }
}
