import { Pipe, PipeTransform } from '@angular/core';
import { transform } from '../widgets/util';
@Pipe({
  name: 'adapt'
})
export class AdaptPipe implements PipeTransform {
  
  transform(data: any | any[], map: any, fields: string[]) {
    return Array.isArray(data) ? data.map(d=>transform(d, map, fields)) : transform(data, map, fields);
  }

}
