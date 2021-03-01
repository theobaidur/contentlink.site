import { Component, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, Input, OnInit, NgZone, OnDestroy } from '@angular/core';
import { NgxTinySliderSettingsInterface } from 'ngx-tiny-slider';
import { AppDataService } from 'src/app/services/app-data.service';
import { filter } from 'rxjs/operators';
import { TinySliderInstance, tns } from 'tiny-slider/src/tiny-slider';
import { Router } from '@angular/router';
import { CarouselType, Page, PageWidget } from 'src/json';
import { BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { appendApiRoot, cleanClientPrefix } from 'src/app/util/helpers';

interface CarouselData{
  id?: string;
  image?: string;
  title?: string;
  caption?: string;
  carousel_type?: string;
  buttons?: {text: string, url: string}[];
}

@UntilDestroy()
@Component({
  selector: 'widget-carousel',
  templateUrl: './carousel.widget.html',
  styleUrls: ['./carousel.widget.scss'],
  host: {
    'class': 'd-block'
  },
  encapsulation: ViewEncapsulation.None
})
export class CarouselWidget implements OnInit, OnDestroy {
  @Input('widget') widget: PageWidget;
  @ViewChild('carousel') carousel: ElementRef<HTMLElement>;
  carouselLoadStatus = new BehaviorSubject<{}>({});
  carouselInstance: TinySliderInstance;
  slides: CarouselData[] = [];
  listPage: Page;
  detailPage: Page;

  initSlider(){
    if(this.slides && Array.isArray(this.slides)){
      const template = this.slides.map(r=>`
        <div class="tns-carousel-item">
          <div class="image-container">
            <img src="${appendApiRoot(r.image)}" />
          </div>
          <div class="caption ${r.title ? 'has-title' : ''} ${r.caption ? 'has-caption' : ''}">
            ${r.title ? `<h1 class="mb-0 ${this.widget.carousel_type === CarouselType.FullWidth ? ``: `text-truncate`}">${r.title}</h1>`:``}
            ${r.caption ? `<p class="${this.widget.carousel_type === CarouselType.FullWidth ? ``: `text-truncate`}">${r.caption}</p>`:``}
            ${Array.isArray(r.buttons) ? r.buttons.map(({text, url})=>`<a class="btn btn-sm" onclick="onCarouselButtonClick(event)" href="javascript:void(0)" data-href="${url}" data-entity='${this.widget.entity}' data-id='${r.id}'>${text}</a>`).join('') : ``}
          </div>
        </div>
      `).join('');
      this.carousel.nativeElement.innerHTML = template;
      this.carouselInstance = tns({
        container: this.carousel.nativeElement,
        ...this.sliderConfig,
        onInit: ()=>{
          this.cdr.detectChanges();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if(this.carouselInstance){
      this.carouselInstance.destroy();
    }
    this.carouselInstance = null;
    this.carousel.nativeElement.innerHTML = '';
    this.carouselLoadStatus.next({});
  }


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
  ) {
    this.carouselLoadStatus.subscribe(({viewInit, dataLoaded}: any)=>{
      if(viewInit && dataLoaded){
        this.initSlider();
      }
    });
  }

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
    const fields = this.dataService.data.getValue()?.entity_fields?.data?.filter(f=>f.entity === entity.entityid) || [];
    const imageField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.image_field)?.field_name);
    const titleField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.title_field)?.field_name);
    const captionField = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.text_field)?.field_name);

    const button_1_text = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.button_1_text)?.field_name);
    const button_1_url = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.button_1_url)?.field_name);
    const button_2_text = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.button_2_text)?.field_name);
    const button_2_url = cleanClientPrefix(fields.find(f=>f.entity_fieldid === this.widget.button_2_url)?.field_name);

    let carousel_type: string = '';
    if(this.widget.carousel_type === CarouselType.FullWidth){
      carousel_type = 'full-width';
    } else if(this.widget.carousel_type === CarouselType.MultiImage){
      carousel_type = 'multi-image';
    } else if(this.widget.carousel_type === CarouselType.MultiSlide){
      carousel_type = 'multi-slide';
    }
    this.dataService.getWidgetDataList(this.widget).pipe(
      untilDestroyed(this),
      filter(list=> list && Array.isArray(list) && list.length > 0)
    ).subscribe(list=>{

      this.slides = list.map(each=>{
        const buttons = [];
        if(this.widget.button_text && this.widget.button_url){
          buttons.push({
            text: this.widget.button_text,
            url: this.widget.button_url
          });
        }
        if(each[button_1_text] && each[button_1_url]){
          buttons.push({
            text: each[button_1_text],
            url: each[button_1_url]
          });
        }
        if(each[button_2_text] && each[button_2_url]){
          buttons.push({
            text: each[button_2_text],
            url: each[button_2_url]
          });
        }
        return {
          id: each.id,
          image: each[imageField],
          title: each[titleField],
          caption: each[captionField],
          carousel_type,
          buttons
        }
      });
      const value = this.carouselLoadStatus.getValue() || {};
      this.carouselLoadStatus.next({
        ...value,
        dataLoaded: true
      });
    });
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
    const value = this.carouselLoadStatus.getValue() || {};
    this.carouselLoadStatus.next({
      ...value,
      viewInit: true
    });
  }

}
