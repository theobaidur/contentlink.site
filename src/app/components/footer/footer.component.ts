import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private appData: AppDataService
  ) { }

  ngOnInit(): void {
  }

  get menuItems(){
    return this.appData.initialSetting.pipe(
      filter(data => data?.footer_menu?.length > 0),
      map(data=> data.footer_menu)
    )
  }

  absUrl(url: string){
    return url.startsWith('http');
  }

}
