import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget-inner-page-title',
  templateUrl: './inner-page-title.component.html',
  styleUrls: ['./inner-page-title.component.scss']
})
export class InnerPageTitleComponent implements OnInit {
  @Input() title: string;
  @Input() sub_title: string;
  @Input() bg = '#FFFFFF';
  constructor() { }

  ngOnInit(): void {
  }

}
