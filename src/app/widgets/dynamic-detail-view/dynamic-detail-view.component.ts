import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { cleanClientPrefix } from 'src/app/util/helpers';
import { PageWidget } from 'src/json';

interface DetailViewData{
  title?: string;
  sub_title?: string;
  text?: string;
  image?: string;
}

@UntilDestroy()
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
    private route: ActivatedRoute  ) { }

  ngOnInit(): void {

    this.route.queryParams.pipe(
      untilDestroyed(this),
      filter(({id, entity})=> !!(id && entity)),
      switchMap(({id, entity})=>{
        const fields = this.dataService.data.getValue().entity_fields?.data?.filter(each=>each.entity === entity) || [];
        const imageField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.image_field)?.field_name);
        const titleField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.title_field)?.field_name);
        const subTitleField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.sub_title_field)?.field_name);
        const textField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.text_field)?.field_name);
        return this.dataService.getWidgetDataDetail(this.widget, id).pipe(
          map(selectedData=>{
            if(selectedData){
              return {
                image: selectedData[imageField],
                title: selectedData[titleField],
                sub_title: selectedData[subTitleField],
                text: selectedData[textField],
              }
            }
            return selectedData;
          })
        )
      })
    ).subscribe(result=>{
      if(result){
        this.data = result;
      }
    });
  }

}
