import { Directive, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { parse } from 'query-string';
@Directive({
  selector: '[appCustomRouterLink]'
})
export class CustomRouterLinkDirective {
  @Input() appCustomRouterLink: string;
  @Input() queryParams: string = '';
  @HostListener('click', ['$event']) onClick($event: MouseEvent){
    $event.preventDefault();
    if(this.appCustomRouterLink.startsWith('http')){
      location.href = this.appCustomRouterLink + (this.queryParams ? `?${this.queryParams}` : '');
    } else {
      this.router.navigate([this.appCustomRouterLink], {
        queryParams: parse(this.queryParams),
       queryParamsHandling: 'merge'
      });
    }
  }
  constructor(
    private el: HTMLAnchorElement,
    private router: Router
  ) { 
    
  }

}
