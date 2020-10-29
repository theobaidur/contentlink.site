import { Component, Input, OnInit } from '@angular/core';
import { PageWidget } from 'src/json';

@Component({
  selector: 'widget-rich-text-viewer',
  templateUrl: './rich-text-viewer.component.html',
  styleUrls: ['./rich-text-viewer.component.scss']
})
export class RichTextViewerComponent implements OnInit {
  @Input() widget: PageWidget;
  constructor() { }

  ngOnInit(): void {}
  isExternal(url: string){
    return (url || '').startsWith('http');
  }
}
