import { Component, OnInit, Input } from '@angular/core';
import { Page } from 'src/model/page.model';
import { Widget } from 'src/model/widget.model';

@Component({
  selector: 'app-inner-page-no-sidebar-layout',
  templateUrl: './inner-page-no-sidebar-layout.component.html',
  styleUrls: ['./inner-page-no-sidebar-layout.component.scss']
})
export class InnerPageNoSidebarLayoutComponent implements OnInit {
  @Input() page: Page;
  constructor() { }

  ngOnInit(): void {
  }

  widgets(location:string){
    if(this.page && this.page.widgets){
      return this.page.widgets.filter(w=>w.widget_location === location);
    }
    return [];
  }
  trackByFn(widget: Widget){
    return widget.id;
  }

}
