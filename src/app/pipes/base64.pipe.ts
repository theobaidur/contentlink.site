import { Pipe, PipeTransform } from '@angular/core';
import { Base64FileConverter } from '../services/base64-file-converter.service';
import { from } from 'rxjs';
@Pipe({
  name: 'base64'
})
export class Base64Pipe implements PipeTransform {
  constructor(
    private base64Converter: Base64FileConverter
  ){}
  transform(src: string) {
    return from(this.base64Converter.prependType(src));
  }

}
