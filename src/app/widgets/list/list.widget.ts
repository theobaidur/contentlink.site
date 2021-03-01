import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { cleanClientPrefix } from 'src/app/util/helpers';
import { ListType, Page, PageWidget } from 'src/json';

interface ListData{
  id?: string;
  icon?: string;
  image?: string;
  title?: string;
  sub_title?: string;
  list_type?: string;
}


@UntilDestroy()
@Component({
  selector: 'widget-list',
  templateUrl: './list.widget.html',
  styleUrls: ['./list.widget.scss']
})
export class ListWidget implements OnInit, OnChanges {
  @Input('widget') widget: PageWidget;
  listPage: Page;
  detailPage: Page;
  pageSize = 4;
  currentPage = 1;
  lastPage = Infinity;
  data: ListData[] = [];
  get types(){
    return ListType;
  }
  get url(){
    if(this.widget?.dynamic_button_url && this.detailPage){
      return this.detailPage?.page_url;
    }
    return this.widget?.button_url;
  }

  queryParam(card: ListData){
    return {
      entity: this.widget.entity,
      id: card.id
    }
  }

  get hasMore(){
    return this.currentPage < this.lastPage;
  }

  loadMore(){
    this.currentPage++;
  }


  trackByFn(item: ListData){
    return item.id;
  }
  buildWidget(){
    // entity
    const entityId = this.widget.entity;
    const entity = this.dataService.data.getValue().entities?.data?.find(e=>e.entityid === entityId);
    if(entity && entity.list_page){
      this.listPage = this.dataService.data.getValue()?.pages?.data?.find(p=>p.pageid === entity.list_page);
    }
    if(entity && entity.detail_page){
      this.detailPage = this.dataService.data.getValue()?.pages?.data?.find(p=>p.pageid === entity.detail_page);
    }
    const fields = this.dataService.data.getValue()?.entity_fields?.data?.filter(f=>f.entity === entity.entityid) || [];
    const iconField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.icon_field)?.field_name);
    const imageField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.image_field)?.field_name);
    const titleField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.title_field)?.field_name);
    const subTitleField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.sub_title_field)?.field_name);
    let list_type: string = '';
    if(this.widget.list_type === ListType.TitleOnly){
      list_type = 'title-only';
    } else if(this.widget.list_type === ListType.TitleWithSubtitle){
      list_type = 'title-with-subtitle';
    } else if(this.widget.list_type === ListType.TitleSubtitleImage){
      list_type = 'title-with-subtitle-image';
    }
    this.dataService.getWidgetDataList(this.widget).pipe(
      untilDestroyed(this),
      filter(list=> Array.isArray(list) && list.length > 0)
    ).subscribe(list=>{
      this.data = list.map(each=>({
        id: each.id,
        icon: each[iconField],
        image: each[imageField],
        title: each[titleField],
        sub_title: each[subTitleField],
        list_type
      }));
      this.pageSize = +this.widget?.max_item_per_page || 4;
      this.lastPage = Math.ceil(this.data.length/this.pageSize);
    });
  }
  ngOnInit() {

  }
  constructor(private dataService: AppDataService  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.widget?.currentValue){
      this.buildWidget();
    }
  }

}
