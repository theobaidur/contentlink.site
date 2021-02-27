import { Injectable } from '@angular/core';
import { fromBuffer } from 'file-type/browser';

@Injectable({
  providedIn: 'root'
})
export class Base64FileConverter{
  async prependType(input: string, fallbackValue = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=`){
    if(input.startsWith('data:')){
      return input;
    }
    try{
      const {mime} = await fromBuffer(Buffer.from(input, 'base64'));
      return `data:${mime};base64, ${input}`;
    } catch(e){
      return fallbackValue;
    }
  }

  async convert<T = any>(item: T, ...fileFields: string[]){
    await Promise.all(fileFields.map(async field=>{
      if(item[field]){
        item[field] = await this.prependType(item[field]);
      }
    }));
    return item;
  }

  async convertAll<T = any>(items: T[], ...fileFields: string[]){
    return await Promise.all(items.map(async each=> await this.convert<T>(each, ...fileFields)));
  }

}
