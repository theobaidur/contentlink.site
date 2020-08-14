import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'trustUrl'
})
export class TrustUrlPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ){}
  transform(str: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(str);
  }

}
