import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment'
@Pipe({
  name: 'src'
})
export class SrcPipe implements PipeTransform {

  transform(src: string): string {
    if(src && src.startsWith('http')){
      return src;
    }
    return `${environment.apiRoot}/storage/${src}`;
  }

}
