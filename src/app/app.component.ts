import { Component } from '@angular/core';
import { AppDataService } from './services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-app';
  constructor(private appService: AppDataService){
    this.appService.appBusy.next(true);
    this.appService.appReady.subscribe(()=>{
      this.appService.appBusy.next(false);
    });
  }
}
