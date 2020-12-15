import { Component, OnInit, Input } from '@angular/core';
import { CarouselType, DataType, Page, PageWidget, Type } from 'src/json';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
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
    return this.page?.PageWidgets?.sort((a,b)=>(+a.WidgetOrder) - (+b.WidgetOrder)) || [];
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
    if(widget.Type === Type.Carousel && widget.CarouselType === CarouselType.FullWidth){
      classes.push('container-fluid');
    } else if(widget.DataType === DataType.Html){
      // do not add any container class
    } else {
      classes.push('container');
    }
    return classes;
  }

  trackByFn(widget: PageWidget){
    return widget.Id;
  }
}
