import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { CardType, Page, PageWidget } from 'src/json';

interface CardData{
  id?: string;
  icon?: string;
  image?: string;
  title?: string;
  sub_title?: string;
  text?: string;
  card_type?: string;
  display_order?: number;
}
@Component({
  selector: 'widget-card',
  templateUrl: './card.widget.html',
  styleUrls: ['./card.widget.scss']
})
export class CardWidget implements OnInit, OnChanges {
  @Input('widget') widget: PageWidget;
  listPage: Page;
  detailPage: Page;
  pageSize = 4;
  currentPage = 1;
  lastPage = Infinity;
  data: CardData[] = [];
  get types(){
    return CardType;
  }
  get url(){
    return this.dataService.data.pipe(
      map(d=>{
        if(this.widget?.dynamic_button_url && this.detailPage){
          return this.detailPage?.page_url;
        }
        return this.widget?.button_url;
      })
    )
  }

  queryParam(card: CardData){
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


  trackByFn(index: any, card: CardData){
    return card.id;
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
    let dataKey: string = entity.system_entity_name;
    if(dataKey){
      const tmpData = this.dataService.data.getValue()[dataKey];
      if(tmpData && Array.isArray(tmpData)){
        // we parse fields now
        const fields = this.dataService.data.getValue().entity_fields?.data?.filter(each=>each.entity === entity.entityid) || [];
        const iconField = fields.find(f=>f.entity_fieldid === this.widget.icon_field)?.field_name;
        const imageField = fields.find(f=>f.entity_fieldid === this.widget.image_field)?.field_name;
        const titleField = fields.find(f=>f.entity_fieldid === this.widget.text_field)?.field_name;
        const subTitleField = fields.find(f=>f.entity_fieldid === this.widget.sub_title_field)?.field_name;
        const textField = fields.find(f=>f.entity_fieldid === this.widget.text_field)?.field_name;

        let card_type: string = '';
        if(this.widget.card_type === CardType.Card){
          card_type = 'card-only';
        } else if(this.widget.card_type === CardType.CardWithIcon){
          card_type = 'card-with-icon';
        } else if(this.widget.card_type === CardType.CardWithImage){
          card_type = 'card-with-image';
        } else if(this.widget.card_type === CardType.CardWithThumb){
          card_type = 'card-with-thumb';
        }
        this.data = tmpData.map(each=>({
          id: each.Id,
          icon: each[iconField],
          image: each[imageField],
          title: each[titleField],
          sub_title: each[subTitleField],
          text: each[textField],
          card_type,
          display_order: each.DisplayOrder ? +each.DisplayOrder : 0
        })).sort((a, b)=>a.display_order - b.display_order);
        this.pageSize = +this.widget?.max_item_per_page || 4;
        this.lastPage = Math.ceil(this.data.length/this.pageSize);
      }
    }
  }
  ngOnInit() {

  }
  constructor(private dataService: AppDataService  ) {}
  ngOnChanges(change: SimpleChanges){
    if(change && change.widget && change.widget.currentValue){
      this.buildWidget();
    }
  }
}
