import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustHtml'
})
export class TrustHtmlPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ){}
  transform(str: string) {
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }

}
