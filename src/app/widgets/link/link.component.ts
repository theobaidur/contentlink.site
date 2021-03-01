import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  @Input() url: string;
  @Input() text: string;
  @Input() wClass: any;
  constructor() { }

  ngOnInit(): void {
  }

  get isExternal(){
    return this.url?.startsWith('http');
  }

}
