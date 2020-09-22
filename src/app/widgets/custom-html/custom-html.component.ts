import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PageWidget } from 'src/json';

@Component({
  selector: 'widget-custom-html',
  templateUrl: './custom-html.component.html',
  styleUrls: ['./custom-html.component.scss']
})
export class CustomHtmlComponent implements OnInit, AfterViewInit {
  @Input() widget: PageWidget;
  @ViewChild('htmlContainer') htmlContainer: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.htmlContainer?.nativeElement?.querySelectorAll('script')?.forEach(script=>{
        eval(script.text);
      });
    },200)
  }
}
