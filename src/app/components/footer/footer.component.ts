import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { filter, map } from 'rxjs/operators';
import { SettingsManagerService } from 'src/app/services/settings-manager.service';
import { MenuItem } from 'src/json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private settings: SettingsManagerService
  ) { }

  ngOnInit(): void {
  }

  get menuItems(){
    return this.settings.menu('footer_menu');
  }

  get footerText(){
    return this.settings.get('footer_text').pipe(
      map(data=> data ? data.value : '')
    )
  }

  isExternal(item: MenuItem){
    return item?.url?.startsWith('http');
  }

}
