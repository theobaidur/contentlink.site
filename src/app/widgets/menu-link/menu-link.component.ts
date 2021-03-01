import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { MenuItem, Target } from 'src/json';

@Component({
  selector: 'app-menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss']
})
export class MenuLinkComponent implements OnInit {
  @Input() item: MenuItem;
  @Input() wClass: any = 'nav-link font-weight-bold';
  constructor(
    private dataService: AppDataService
  ) { }

  ngOnInit(): void {
  }

  get url(){
    if(this.item?.target_url === Target.Page){
      return this.dataService.data.pipe(
        map(data=>data.pages.data.find(({pageid})=>pageid === this.item?.page)?.page_url)
      )
    }
    return of(this.item?.url);
  }

}
