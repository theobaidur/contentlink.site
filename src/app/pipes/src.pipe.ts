import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment'
import { src } from '../widgets/util';
@Pipe({
  name: 'src'
})
export class SrcPipe implements PipeTransform {

  transform(_src: string): string {
    return src(_src);
  }

}
