import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WidgetLocation, PageWidget, Type, Page, DataType } from 'src/json';

@Component({
  selector: 'app-inner-page-no-sidebar-layout',
  templateUrl: './inner-page-no-sidebar-layout.component.html',
  styleUrls: ['./inner-page-no-sidebar-layout.component.scss']
})
export class InnerPageNoSidebarLayoutComponent implements OnInit, OnChanges {
  @Input() page: Page;
  constructor() { }

  ngOnInit(): void {}

  get type(){
    return Type;
  }

  get dataType(){
    return DataType;
  }

  widgets(){
    if(this.page && this.page.PageWidgets){
      return this.page.PageWidgets;
    }
    return [];
  }

  wrapperClass(widget: PageWidget){
    let type = '';
    if(widget.DataType === DataType.EntityData){
      if(widget.Type === Type.Carousel){
        type = 'carousel';
      }if(widget.Type === Type.CardList){
        type = 'card_list';
      }if(widget.Type === Type.List){
        type = 'list';
      }if(widget.Type === Type.DynamicDataView){
        type = 'dynamic-data-view';
      }
    } else if(widget.DataType === DataType.RichText){
      type = 'rich-text';
    } else if(widget.DataType === DataType.Menu){
      type = 'menu';
    }else if(widget.DataType === DataType.Html){
      type = 'html';
    }

    const classes = [`widget__${type}`];
    if(widget.CustomCSSClass){
      classes.push(widget.CustomCSSClass);
    }
    classes.push('container inner-page-sidebar');
    return classes;
  }


  trackByFn(widget: PageWidget){
    return widget.Id;
  }

  ngOnChanges(changes: SimpleChanges){}

}
