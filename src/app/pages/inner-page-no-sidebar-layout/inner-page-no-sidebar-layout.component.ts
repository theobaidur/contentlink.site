import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { PageWidget, WidgetType, Page, DataType } from 'src/json';

@UntilDestroy()
@Component({
  selector: 'app-inner-page-no-sidebar-layout',
  templateUrl: './inner-page-no-sidebar-layout.component.html',
  styleUrls: ['./inner-page-no-sidebar-layout.component.scss']
})
export class InnerPageNoSidebarLayoutComponent implements OnInit, OnChanges {
  @Input() page: Page;
  widgets: PageWidget[] = [];
  onPageChange = new Subject<Page>();
  constructor(
    private dataService: AppDataService
  ) {
    this.onPageChange.pipe(
      untilDestroyed(this),
      filter(page=> !!(page && page.pageid)),
      map(({pageid})=>pageid),
      distinctUntilChanged(),
      switchMap(pageid=>this.dataService.data.pipe(
        map(data=> data?.page_widgets?.data?.filter(({page})=>page && pageid === page) || [])
      ))
    ).subscribe(list=>{
      this.widgets = list;
    });

  }

  ngOnInit(): void {}

  get widgetType(){
    return WidgetType;
  }

  get dataType(){
    return DataType;
  }

  wrapperClass(widget: PageWidget){
    let type = '';
    if(widget.data_type === DataType.EntityData){
      if(widget.type === WidgetType.Carousel){
        type = 'carousel';
      }if(widget.type === WidgetType.CardList){
        type = 'card_list';
      }if(widget.type === WidgetType.List){
        type = 'list';
      }if(widget.type === WidgetType.DynamicDataView){
        type = 'dynamic-data-view';
      }
    } else if(widget.data_type === DataType.RichText){
      type = 'rich-text';
    } else if(widget.data_type === DataType.Menu){
      type = 'menu';
    }else if(widget.data_type === DataType.Html){
      type = 'html';
    }

    const classes = [`widget__${type}`];
    if(widget.custom_css_class){
      classes.push(widget.custom_css_class);
    }
    classes.push('container inner-page-sidebar');
    return classes;
  }


  trackByFn(_: any,{page_widgetid}: PageWidget){
    return page_widgetid;
  }

  ngOnChanges({page}: SimpleChanges){
    if(page){
      this.onPageChange.next(page.currentValue);
    }
  }

}
