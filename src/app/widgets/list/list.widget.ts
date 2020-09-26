import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { ListType, Page, PageWidget } from 'src/json';

interface ListData{
  id?: string;
  icon?: string;
  image?: string;
  title?: string;
  sub_title?: string;
  list_type?: string;
}
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
    if(this.widget?.DynamicButtonURL === 'True' && this.detailPage){
      return this.detailPage?.PageURL;
    }
    return this.widget?.ButtonURL;
  }

  queryParam(card: ListData){
    return {
      entity: this.widget.Entity,
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
    const entityId = this.widget.Entity;
    const entity = this.dataService.data.getValue().xEntities.find(e=>e.Id === entityId);
    if(entity && entity.ListPage){
      this.listPage = this.dataService.data.getValue()?.Pages?.find(p=>p.Id === entity.ListPage);
    }
    if(entity && entity.DetailPage){
      this.detailPage = this.dataService.data.getValue()?.Pages?.find(p=>p.Id === entity.DetailPage);
    }
    let dataKey: string = entity.SystemEntityName;
    if(dataKey){
      const tmpData = this.dataService.data.getValue()[dataKey];
      if(tmpData && Array.isArray(tmpData)){
        // we parse fields now
        const fields = entity.EntityFields || [];
        const iconField = fields.find(f=>f.Id === this.widget.IconField)?.FieldName;
        const imageField = fields.find(f=>f.Id === this.widget.ImageField)?.FieldName;
        const titleField = fields.find(f=>f.Id === this.widget.TitleField)?.FieldName;
        const subTitleField = fields.find(f=>f.Id === this.widget.SubTitleField)?.FieldName;
        let list_type: string = '';
        if(this.widget.ListType === ListType.TitleOnly){
          list_type = 'title-only';
        } else if(this.widget.ListType === ListType.TitleWithSubtitle){
          list_type = 'title-with-subtitle';
        } else if(this.widget.ListType === ListType.TitleSubtitleImage){
          list_type = 'title-with-subtitle-image';
        }

        this.data = tmpData.map(each=>({
          id: each.Id,
          icon: each[iconField],
          image: each[imageField],
          title: each[titleField],
          sub_title: each[subTitleField],
          list_type,
          display_order: each.DisplayOrder ? +each.DisplayOrder : 0
        })).sort((a, b)=>a.display_order - b.display_order);
        this.pageSize = +this.widget?.MaxItemPerPage || 4;
        this.lastPage = Math.ceil(this.data.length/this.pageSize);
      }
    }
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
