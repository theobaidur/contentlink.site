import { Pipe, PipeTransform } from '@angular/core';
import { appendApiRoot } from '../util/helpers';
@Pipe({
  name: 'src'
})
export class SrcPipe implements PipeTransform {

  transform(src: string): string {
    return appendApiRoot(src);
  }

}
