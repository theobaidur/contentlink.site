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
        if(this.widget?.DynamicButtonURL === 'True' && this.detailPage){
          return this.detailPage?.PageURL;
        }
        return this.widget?.ButtonURL;
      })
    )
  }

  queryParam(card: CardData){
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


  trackByFn(card: CardData){
    return card.id;
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
        const textField = fields.find(f=>f.Id === this.widget.TextField)?.FieldName;
        let card_type: string = '';
        if(this.widget.CardType === CardType.Card){
          card_type = 'card-only';
        } else if(this.widget.CardType === CardType.CardWithIcon){
          card_type = 'card-with-icon';
        } else if(this.widget.CardType === CardType.CardWithImage){
          card_type = 'card-with-image';
        } else if(this.widget.CardType === CardType.CardWithThumb){
          card_type = 'card-with-thumb';
        }
        this.data = tmpData.map(each=>({
          id: each.Id,
          icon: each[iconField],
          image: each[imageField],
          title: each[titleField],
          sub_title: each[subTitleField],
          text: each[textField],
          card_type
        }));
        this.pageSize = +this.widget?.MaxItemPerPage || 4;
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
