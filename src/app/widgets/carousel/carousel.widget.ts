import { Component, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { NgxTinySliderSettingsInterface } from 'ngx-tiny-slider';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppDataService } from 'src/app/services/app-data.service';
import { CarouselWidgetConfig } from '../../../model/widget-config';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../../../model/paginated-result.model';
import { tns } from 'tiny-slider/src/tiny-slider';
import { src, transform } from '../util';
import { Router } from '@angular/router';
import { BaseWidget } from '../base.widget';
import { Widget } from 'src/model/widget.model';
@Component({
  selector: 'widget-carousel',
  templateUrl: './carousel.widget.html',
  styleUrls: ['./carousel.widget.scss'],
  host: {
    'class': 'd-block'
  },
  encapsulation: ViewEncapsulation.None
})
export class CarouselWidget extends BaseWidget<CarouselWidgetConfig> {
  @Input('widget') _widget: Widget;
  @ViewChild('carousel') carousel: ElementRef<HTMLElement>;
  carouselTypes = ['full-width', 'multi-slide', 'multi-image'];
  slides: any[] = [];
  fields = ['image', 'title', 'caption', 'button_text', 'button_url'];

  get type(){
    let type = this.carouselTypes[0];
    if(this.carouselTypes.indexOf(this.config.carousel_type) > -1){
      type = this.config.carousel_type;
    }
    return type;
  }

  get map(){
    return this.config.map || {}
  }

  get center(){
    if(this.config.carousel_type === 'full-width'){
      return true;
    }

    // return this.config.
  }

  get sliderConfig(): NgxTinySliderSettingsInterface{
    let items = 1;
    if(this.config.carousel_type === 'multi-image'){
      items = 4;
    }
    if(this.config.carousel_type === 'multi-slide'){
      items = 4;
    }
    return {
      items,
      slideBy: this.config.carousel_type === 'full-width' ? 'page' : 1,
      mouseDrag: true,
      autoplay: false,
      autoplayButton: false,
      autoplayButtonOutput: null,
      animateDelay: 200000,
      gutter: this.config.carousel_type === 'full-width'? null : 10,
      controls: false,
      controlsText: ['<i class="fas fa-chevron-left fa-2x"></i>', '<i class="fas fa-chevron-right fa-2x"></i>'],
      navPosition: 'bottom',

    };
  }

  getSlides(): Observable<any[] | null>{
    if(this.config.slides && Array.isArray(this.config.slides)){
      return of(this.config.slides);
    }
    if(this.widget.data_type === 'content'){
      return of([this.widget]);
    }
    if(this.widget.data_type === 'selected_data'){
      return this.dataService.currentPageResponse.pipe(
        map(page=> [page.selected_data])
      )
    }
    if(this.widget.data_type === 'menu'){
      return this.http.get(`${environment.apiRoot}/api/widget/${this.widget.id}`).pipe(
        map((response: any)=> response.items as any[])
      )
    }

    if(this.widget.data_type === 'data'){
      return this.http.get<PaginatedResult<any[]>>(`${environment.apiRoot}/api/widget/${this.widget.id}`).pipe(
        map(response=>response.data)
      )
    }
    return of([]);
  }
  ngOnInit() {}
  constructor(
    private http: HttpClient,
    private dataService: AppDataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { 
    super();
  }
/**
 * <div class="carousel-item">
            <div class="image-container">
            </div>
            <div class="caption">
              ${r.title ? `<h1>${r.title}</h1>`:``}
              ${r.caption ? `<h3 class="mb-0 ${this.config.carousel_type === 'full-width' ? ``: `text-truncate`}">${r.caption}</h3>`:``}
              ${r.button_text ? `<a class="btn btn-sm" href="${r.button_url}">${r.button_text}</a>`: ``}
            </div>
          </div>
 */
  ngAfterViewInit(): void {
    this.getSlides().subscribe(result=>{
      if(result && Array.isArray(result)){
        const template = result.map(r=>transform<any>(r, this.map, this.fields)).map(r=>`
          <div class="tns-carousel-item">
            <div class="image-container">
              <img src="${src(r.image)}" />
            </div>
            <div class="caption">
              ${r.title ? `<h1>${r.title}</h1>`:``}
              ${r.caption ? `<h3 class="mb-0 ${this.config.carousel_type === 'full-width' ? ``: `text-truncate`}">${r.caption}</h3>`:``}
              ${r.button_text ? `<a class="btn btn-sm" href="${r.button_url}">${r.button_text}</a>`: ``}
            </div>
          </div>
        `).join('');
        this.carousel.nativeElement.innerHTML = template;
        this.carousel.nativeElement.querySelectorAll('a').forEach(a=>{
          ((el: HTMLAnchorElement)=>{
            el.addEventListener('click', e=>{
              e.preventDefault();
              const target: HTMLAnchorElement = e.target as HTMLAnchorElement;
              const url = target.href;
              if(url.startsWith('http')){
                window.location.href = url;
              } else {
                this.router.navigate([url]);
              }
            });
          })(a);
        });
        tns({
          container: this.carousel.nativeElement,
          ...this.sliderConfig,
          onInit: ()=>{
            this.status = 'loaded';
            this.cdr.detectChanges();
          }
        });
      } else { 
        this.status = 'loading';
        this.cdr.detectChanges();
      }
    });
  }

}
