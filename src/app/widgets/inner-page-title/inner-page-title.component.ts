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
    if(this.page?.BackgroundImage){
      return {
        backgroundImage: `url(${src(this.page?.BackgroundImage)})`
      }
    }
    return {}
  }

  get styleBg(){
    return this.page?.BackgroundColor ? {backgroundColor: this.page?.BackgroundColor} : {}
  }

  get title(){
    if(this.page?.Name){
      return this.page.Name;
    }
    if(this.page?.PageURL){
      return this.page?.PageURL.substr(1)?.split('-').map(p=>`${p[0].toUpperCase()}${p.substr(1).toLowerCase()}`).join(' ');
    }
    return 'No Title';
  }
  constructor() { }

  ngOnInit(): void {
  }

}
