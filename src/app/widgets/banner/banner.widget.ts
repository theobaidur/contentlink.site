import { Component, OnInit, Input } from '@angular/core';
import { Widget } from 'src/model/widget.model';

@Component({
  selector: 'widget-banner',
  templateUrl: './banner.widget.html',
  styleUrls: ['./banner.widget.scss']
})
export class BannerWidget implements OnInit {
  @Input() widget: Widget;
  constructor() { }

  ngOnInit(): void {
  }

}
