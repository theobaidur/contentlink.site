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
      filter(param=> param.id && !!this.widget?.entity),
      switchMap(params=>this.dataService.data.pipe(
        map(data=>{
          // entity
          const entityId = this.widget.entity;
          const entity = data?.entities?.data?.find(e=>e.entityid === entityId);
          let dataKey: string = entity.system_entity_name;
          if(dataKey){
            const tmpData = this.dataService.data.getValue()[dataKey];
            if(tmpData && Array.isArray(tmpData)){
              const selectedData = tmpData.find(f=>f.Id === params.id)
              if(selectedData){
                // we parse fields now
                const fields = this.dataService.data.getValue().entity_fields?.data?.filter(each=>each.entity === entity.entityid) || [];
                const imageField = fields.find(f=>f.entity_fieldid === this.widget.image_field)?.field_name;
                const titleField = fields.find(f=>f.entity_fieldid === this.widget.title_field)?.field_name;
                const subTitleField = fields.find(f=>f.entity_fieldid === this.widget.sub_title_field)?.field_name;
                const textField = fields.find(f=>f.entity_fieldid === this.widget.text_field)?.field_name;

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
