import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'widget-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {
  @Input() btnClass?: string;  
  @Input() type: string = 'button';
  @Input() disabled?: boolean;
  @Input() busy?: string;
  @Input() icon?: string;
  @Input() label: string = 'Submit';
  @Input() goto?: string = null;
  @Output() click: EventEmitter<MouseEvent> =new EventEmitter();

  get buttonClass(){
      let _class: string[] = ['btn'];
      if(this.btnClass) _class.push(this.btnClass)
      
      return _class.join(' ');
  }

  get isDisabled(){
      return this.disabled || this.busy; 
  }

  get iconClass(){
      if(this.busy){
          return 'fas fa-circle-notch fa-spin';
      }
      return this.icon;
  }
  clickHandler(e: MouseEvent){
      e.stopPropagation();
      if(this.goto){
          this.router.navigate([this.goto]);
      }
      this.click.emit(e);
  }

    ngOnInit(): void {
    }
    constructor(
        private router: Router
    ){}

}
