import { Component, OnInit, Input } from '@angular/core';
import { Widget } from 'src/model/widget.model';

@Component({
  selector: 'widget-content-box',
  templateUrl: './content-box.widget.html',
  styleUrls: ['./content-box.widget.scss']
})
export class ContentBoxWidget implements OnInit {
  @Input() widget: Widget;
  constructor() { }

  ngOnInit(): void {
  }

}
