import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppDataService } from './services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-app';
  constructor(private appService: AppDataService, router: Router, route: ActivatedRoute){
    this.appService.appBusy.next(true);
    this.appService.appReady.subscribe(ready=>{
      this.appService.appBusy.next(!ready);
    });

    /**
     * Sometimes page won't load for long time and then would load on refresh
     * So, we are doing a trick here. If the data is not loaded after maxWait seconds, we do a refresh
     * We will keep trying this for maxRetry times;
     */

    const maxRetry = 5;
    const maxWait = 15;

    const reloadIfNOtLoadedYet = ()=>{
      /**
       * App loaded, so do not proceed.
       */
      if(this.appService.appReady.getValue()){
        return;
      }

      /**
       * We need to count number of retries, otherwise, we will be in a loop for ever
       */
      let {reloaded} = route.snapshot.queryParams;
      /**
       * Sanitizing the reloaded counter, i.e. if not defined we set it 0, or we convert string to number;
       */
      if(!reloaded){
        reloaded = 0;
      } else {
        reloaded = +reloaded;
      }
      /**
       * We increase counter
       */
      reloaded++;
      if(reloaded <= maxRetry){
        /**
         * We are still in maximum retries, so we update query params
         */
        router.navigate([], {queryParams: {reloaded}});

        /**
         * And then reload
         */
        setTimeout(()=>{
          location.reload();
        },10);
      }
    }

    /**
     * On every maxWait seconds, we check if the page is loaded
     */
     setTimeout(()=>reloadIfNOtLoadedYet(), maxWait*1000);


    router.events.pipe(
      filter(event=> event instanceof NavigationEnd)
    ).subscribe(()=>{
      window.scrollTo(0,0);
    });
  }
}
