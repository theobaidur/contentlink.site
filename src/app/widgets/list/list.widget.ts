import { Component, OnInit, Input } from '@angular/core';
import { Widget } from 'src/model/widget.model';

@Component({
  selector: 'widget-list',
  templateUrl: './list.widget.html',
  styleUrls: ['./list.widget.scss']
})
export class ListWidget implements OnInit {
  @Input() widget: Widget;
  constructor() { }

  ngOnInit(): void {
  }

}
