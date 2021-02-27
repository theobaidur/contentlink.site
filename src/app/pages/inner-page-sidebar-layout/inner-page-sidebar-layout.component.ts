import { Component, OnInit, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { DataType, Page, PageWidget, WidgetType, WidgetLocation } from 'src/json';

@UntilDestroy()
@Component({
  selector: 'app-inner-page-sidebar-layout',
  templateUrl: './inner-page-sidebar-layout.component.html',
  styleUrls: ['./inner-page-sidebar-layout.component.scss']
})
export class InnerPageSidebarLayoutComponent implements OnInit {
  @Input() page: Page;
  _widgets: PageWidget[] = [];
  constructor(
    private dataService: AppDataService
  ) { }

  ngOnInit(): void {
    this.dataService.data.pipe(
      untilDestroyed(this),
      map(({page_widgets})=>page_widgets.data.filter(({page})=>this.page && page === this.page.pageid))
    ).subscribe(list=>{
      this._widgets = list;
    });
  }

  widgets(location: WidgetLocation){
    return this._widgets.filter(({show_in})=>show_in === location)
  }

  get locations(){
    return WidgetLocation;
  }

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

}
