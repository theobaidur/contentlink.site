import { Component, OnInit, Input } from '@angular/core';
import { DataType, Page, PageWidget, Type, WidgetLocation } from 'src/json';

@Component({
  selector: 'app-inner-page-sidebar-layout',
  templateUrl: './inner-page-sidebar-layout.component.html',
  styleUrls: ['./inner-page-sidebar-layout.component.scss']
})
export class InnerPageSidebarLayoutComponent implements OnInit {
  @Input() page: Page;

  constructor() { }

  ngOnInit(): void {}

  get locations(){
    return WidgetLocation;
  }

  get type(){
    return Type;
  }

  get dataType(){
    return DataType;
  }

  widgets(location:WidgetLocation){
    if(this.page && this.page.PageWidgets){
      return this.page.PageWidgets.filter(w=>w.ShowIn === location);
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

}
