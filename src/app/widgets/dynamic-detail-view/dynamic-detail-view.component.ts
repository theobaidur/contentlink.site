import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { PageWidget } from 'src/json';

interface DetailViewData{
  title?: string;
  sub_title?: string;
  text?: string;
  image?: string;
}

@Component({
  selector: 'widget-dynamic-detail-view',
  templateUrl: './dynamic-detail-view.component.html',
  styleUrls: ['./dynamic-detail-view.component.scss']
})
export class DynamicDetailViewComponent implements OnInit {
  @Input() widget: PageWidget;
  data: DetailViewData;
  get hasImage(){
    return !!this.data?.image;
  }
  constructor(
    private dataService: AppDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter(param=> param.id && !!this.widget?.Entity),
      switchMap(params=>this.dataService.data.pipe(
        map(data=>{
          // entity
          const entityId = this.widget.Entity;
          const entity = data?.xEntities.find(e=>e.Id === entityId);
          let dataKey: string = entity.SystemEntityName;
          if(dataKey){
            const tmpData = this.dataService.data.getValue()[dataKey];
            if(tmpData && Array.isArray(tmpData)){
              const selectedData = tmpData.find(f=>f.Id === params.id)
              if(selectedData){
                // we parse fields now
                const fields = entity.EntityFields || [];
                const imageField = fields.find(f=>f.Id === this.widget.ImageField)?.FieldName;
                const titleField = fields.find(f=>f.Id === this.widget.TitleField)?.FieldName;
                const subTitleField = fields.find(f=>f.Id === this.widget.SubTitleField)?.FieldName;
                const textField = fields.find(f=>f.Id === this.widget.TextField)?.FieldName;

                return {
                  image: selectedData[imageField],
                  title: selectedData[titleField],
                  sub_title: selectedData[subTitleField],
                  text: selectedData[textField],
                }
              }
            }
          }
          return null;
        })
      ))
    ).subscribe(result=>{
      if(result){
        this.data = result;
      }
    });
  }

}
