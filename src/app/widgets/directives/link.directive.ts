import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[widgetLink]'
})
export class LinkDirective {
  constructor(el: ElementRef<HTMLAnchorElement>, private router: Router) {
    el.nativeElement.addEventListener('click', e=>{
      e.preventDefault();
      const url = el.nativeElement.getAttribute('href');
      if(url.startsWith('http')){
        location.href = url;
      } else {
        this.router.navigate([url]);
      }
    });
  }

}
