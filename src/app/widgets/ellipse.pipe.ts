import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipse'
})
export class EllipsePipe implements PipeTransform {

  transform(value: string, len=Infinity){
    if(value.length < len){
      return value;
    }
    const substr = value.substr(0, len-3);
    return `${substr}...`;
  }

}
