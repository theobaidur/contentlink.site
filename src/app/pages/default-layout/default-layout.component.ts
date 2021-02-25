import { Component, OnInit, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { CarouselType, DataType, Page, PageWidget, WidgetType } from 'src/json';

@UntilDestroy()
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  @Input() page: Page;
  widgets: PageWidget[] = [];
  constructor(
    private dataService: AppDataService
  ) { }

  ngOnInit(): void {
    this.dataService.data.pipe(
      untilDestroyed(this),
      map(({page_widgets})=>page_widgets.data.filter(({page})=>this.page && page === this.page.pageid))
    ).subscribe(list=>{
      this.widgets = list;
    });
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
    if(widget.type === WidgetType.Carousel && widget.carousel_type === CarouselType.FullWidth){
      classes.push('container-fluid');
    } else {
      classes.push('container');
    }
    return classes;
  }

  trackByFn({page_widgetid}: PageWidget){
    return page_widgetid;
  }
}
