import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { Menu, MenuItem, PageWidget } from 'src/json';

@Component({
  selector: 'widget-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() widget: PageWidget;
  menu: Menu;

  constructor(
    private dataService: AppDataService
  ) { }

  isExternal(item: MenuItem){
    return item?.url?.startsWith('http');
  }

  buildWidget(){
    const data = this.dataService.data.getValue();
    this.menu = data?.menus?.data?.find(m=>m.menuid === this.widget?.menu);
  }

  ngOnInit(): void {
    this.dataService.data
    .pipe(
      map(data=> data?.menus?.data?.find(m=>m.menuid === this.widget?.menu))
    )
    .subscribe(d=>{
      this.menu =d;
    });
  }

  get items(){
    return this.dataService.data.getValue()?.menu_items?.data?.filter(e=>e.menu === this.menu?.menuid) || []
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.widget?.currentValue){
      this.buildWidget();
    }
  }

}
