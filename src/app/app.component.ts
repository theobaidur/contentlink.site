import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppDataService } from './services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-app';
  constructor(private appService: AppDataService, router: Router){
    this.appService.appBusy.next(true);
    this.appService.appReady.subscribe(ready=>{
      this.appService.appBusy.next(!ready);
    });

    router.events.pipe(
      filter(event=> event instanceof NavigationEnd)
    ).subscribe(()=>{
      window.scrollTo(0,0);
    });

    document.addEventListener('click', e=>{
      const target: HTMLElement = e.target as HTMLElement;
      if(target.hasAttribute('dynamic-target')){
        e.preventDefault();
        const url = (e.target as HTMLElement).getAttribute('href');
        try{
          router.navigate([url]);
        } catch(e){
          console.log(e);
        }
      }
    });
  }
}
