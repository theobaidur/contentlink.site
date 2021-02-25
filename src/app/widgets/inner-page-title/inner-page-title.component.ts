import { Component, OnInit, Input } from '@angular/core';
import { Page } from 'src/json';
import { src } from '../util';

@Component({
  selector: 'widget-inner-page-title',
  templateUrl: './inner-page-title.component.html',
  styleUrls: ['./inner-page-title.component.scss']
})
export class InnerPageTitleComponent implements OnInit {
  @Input() page: Page;

  get styleWrapper(){
    if(this.page?.background_image_url){
      return {
        backgroundImage: `url(${src(this.page?.background_image_url)})`
      }
    }
    return {}
  }

  get styleBg(){
    return this.page?.background_color ? {backgroundColor: this.page?.background_color} : {}
  }

  get title(){
    if(this.page?.name){
      return this.page.name;
    }
    if(this.page?.page_url){
      return this.page?.page_url.substr(1)?.split('-').map(p=>`${p[0].toUpperCase()}${p.substr(1).toLowerCase()}`).join(' ');
    }
    return 'No Title';
  }
  constructor() { }

  ngOnInit(): void {
  }

}
