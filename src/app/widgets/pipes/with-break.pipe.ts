import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withBreak'
})
export class WithBreakPipe implements PipeTransform {
  transform(value: string) {
    if(!value){
      return '';
    }
    return value.split(/\r?\n/).map(para=>`<p>${para} </p>`).join('');
  }

}
