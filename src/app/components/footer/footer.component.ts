import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { filter, map } from 'rxjs/operators';
import { MenuItem, Target } from 'src/json';

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
    return this.appData.data.pipe(
      map(response=>{
        return (response?.Menus?.find(a=>a.Name.toLowerCase().indexOf('footer') > -1).MenuItem || []).map(item=>{
          if(item?.TargetURL === Target.Page){
            const url = this.appData.data.getValue()?.Pages?.find(p=>p.Id === item.page)?.PageURL || '';
            item.URL = url;
          }
          return item;
        }).sort((a, b)=>a.Order - b.Order);
      })
    )
  }

  absUrl(url: string){
    return url.startsWith('http');
  }

  isExternal(item: MenuItem){
    return item?.URL?.startsWith('http');
  }

}
