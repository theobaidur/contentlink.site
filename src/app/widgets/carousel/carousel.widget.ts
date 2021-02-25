import { Component, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, Input, OnInit, NgZone } from '@angular/core';
import { NgxTinySliderSettingsInterface } from 'ngx-tiny-slider';
import { AppDataService } from 'src/app/services/app-data.service';
import { map } from 'rxjs/operators';
import { tns } from 'tiny-slider/src/tiny-slider';
import { src } from '../util';
import { Router } from '@angular/router';
import { CarouselType, Page, PageWidget } from 'src/json';

interface CarouselData{
  id?: string;
  image?: string;
  title?: string;
  caption?: string;
  carousel_type?: string;
}
@Component({
  selector: 'widget-carousel',
  templateUrl: './carousel.widget.html',
  styleUrls: ['./carousel.widget.scss'],
  host: {
    'class': 'd-block'
  },
  encapsulation: ViewEncapsulation.None
})
export class CarouselWidget implements OnInit {
  @Input('widget') widget: PageWidget;
  @ViewChild('carousel') carousel: ElementRef<HTMLElement>;
  slides: CarouselData[] = [];
  listPage: Page;
  detailPage: Page;

  get type(){
    let carousel_type: string = '';
    if(this.widget.carousel_type === CarouselType.FullWidth){
      carousel_type = 'full-width';
    } else if(this.widget.carousel_type === CarouselType.MultiImage){
      carousel_type = 'multi-image';
    } else if(this.widget.carousel_type === CarouselType.MultiSlide){
      carousel_type = 'multi-slide';
    }
    return carousel_type;
  }
  // multi-image, multi-slide, full-width
  get sliderConfig(): NgxTinySliderSettingsInterface{
    let items = 1;
    if(this.widget?.carousel_type !== CarouselType.FullWidth){
      items = 4;
    }
    return {
      items,
      slideBy: this.widget?.carousel_type === CarouselType.FullWidth ? 'page' : 1,
      mouseDrag: true,
      autoplay: true,
      autoplayButton: false,
      autoplayButtonOutput: null,
      animateDelay: 2000,
      gutter: this.widget?.carousel_type === CarouselType.FullWidth ? null : 10,
      controls: false,
      controlsText: ['<i class="fas fa-chevron-left fa-2x"></i>', '<i class="fas fa-chevron-right fa-2x"></i>'],
      navPosition: 'bottom',

    };
  }
  constructor(
    private dataService: AppDataService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }
  get url(){
    if(this.widget?.dynamic_button_url && this.detailPage){
      return this.detailPage?.page_url;
    }
    return this.widget?.button_url;
  }

  queryParam(carousel: CarouselData){
    return {
      entity: this.widget.entity,
      id: carousel.id
    }
  }

  ngOnInit() {
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
        const fields = this.dataService.data.getValue()?.entity_fields?.data?.filter(f=>f.entity === entity.entityid) || [];
        const imageField = fields.find(f=>f.entity_fieldid === this.widget.image_field)?.field_name;
        const titleField = fields.find(f=>f.entity_fieldid === this.widget.title_field)?.field_name;
        const captionField = fields.find(f=>f.entity_fieldid === this.widget.text_field)?.field_name;
        console.log({tmpData, imageField, titleField, captionField});
        let carousel_type: string = '';
        if(this.widget.carousel_type === CarouselType.FullWidth){
          carousel_type = 'full-width';
        } else if(this.widget.carousel_type === CarouselType.MultiImage){
          carousel_type = 'multi-image';
        } else if(this.widget.carousel_type === CarouselType.MultiSlide){
          carousel_type = 'multi-slide';
        }

        this.slides = tmpData.map(each=>({
          id: each.Id,
          image: each[imageField],
          title: each[titleField],
          caption: each[captionField],
          carousel_type,
          display_order: each.DisplayOrder ? +each.DisplayOrder : 0
        })).sort((a, b)=>a.display_order - b.display_order);
      }
    }
  }
  ngAfterViewInit(): void {
    if(typeof window['onCarouselButtonClick'] === 'undefined'){
      window['onCarouselButtonClick'] = (e: MouseEvent)=>{
        e.preventDefault();
        const target: HTMLAnchorElement = e.target as HTMLAnchorElement;
        const url = target.getAttribute('data-href');
        const entity = target.getAttribute('data-entity');
        const id = target.getAttribute('data-id');
        let queryParams = {};
        if(entity && id){
          queryParams = {entity, id}
        }
        if(url.startsWith('http')){
          window.location.href = url;
        } else {
          this.zone.run(()=>{
            this.router.navigate([url], {queryParams, queryParamsHandling: 'merge'});
          });
        }
      }
    }
    if(this.slides && Array.isArray(this.slides)){
      const template = this.slides.map(r=>`
        <div class="tns-carousel-item">
          <div class="image-container">
            <img src="${src(r.image)}" />
          </div>
          <div class="caption">
            ${r.title ? `<h1 class="mb-0 ${this.widget.carousel_type === CarouselType.FullWidth ? ``: `text-truncate`}">${r.title}</h1>`:``}
            ${r.caption ? `<p class="${this.widget.carousel_type === CarouselType.FullWidth ? ``: `text-truncate`}">${r.caption}</p>`:``}
            ${this.widget.button_text ? `<a class="btn btn-sm" onclick="onCarouselButtonClick(event)" href="javascript:void(0)" data-href="${this.url}" data-entity='${this.widget.entity}' data-id='${r.id}'>${this.widget.button_text}</a>`: ``}
          </div>
        </div>
      `).join('');
      this.carousel.nativeElement.innerHTML = template;
      tns({
        container: this.carousel.nativeElement,
        ...this.sliderConfig,
        onInit: ()=>{
          this.cdr.detectChanges();
        }
      });
    } else {
      this.cdr.detectChanges();
    }
  }

}
