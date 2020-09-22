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
    return item?.URL?.startsWith('http');
  }

  buildWidget(){
    const data = this.dataService.data.getValue();
    this.menu = data?.Menus?.find(m=>m.Id === this.widget?.Menu);
  }

  ngOnInit(): void {
    this.dataService.data
    .pipe(
      map(d=> d?.Menus?.find(m=>m.Id === this.widget?.Menu))
    )
    .subscribe(d=>{
      this.menu =d;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.widget?.currentValue){
      this.buildWidget();
    }
  }

}
