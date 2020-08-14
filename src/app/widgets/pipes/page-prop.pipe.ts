import { Pipe, PipeTransform } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { get } from 'lodash';
@Pipe({
  name: 'pageProp'
})
export class PagePropPipe implements PipeTransform {
  constructor(
    private dataService: AppDataService
  ){}
  transform(path: string) {
    console.log(path);
    if(!path){
      return path;
    }
    const page = this.dataService.currentPageResponse.getValue();
    const _path = path.replace(/[^a-z0-9._]+/gi, "");
    return get(page, _path, path);
  }

}
