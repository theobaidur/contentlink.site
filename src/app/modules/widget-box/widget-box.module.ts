import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerWidget } from '../../widgets/banner/banner.widget';
import { CardWidget } from '../../widgets/card/card.widget';
import { CarouselWidget } from '../../widgets/carousel/carousel.widget';
import { ContentBoxWidget } from '../../widgets/content-box/content-box.widget';
import { FormWidget } from '../../widgets/form/form.widget';
import { ListWidget } from '../../widgets/list/list.widget';
import { MenuWidget } from '../../widgets/menu/menu.widget';
import { TextBoxWidget } from '../../widgets/text-box/text-box.widget';
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { AdaptPipe } from '../../pipes/adapt.pipe';
import { SharedModule } from '../shared/shared.module';
import { LinkDirective } from '../../widgets/directives/link.directive';
import { BtnComponent } from '../../widgets/btn/btn.component';
import { TrustUrlPipe } from '../../widgets/pipes/trust-url.pipe';
import { PagePropPipe } from '../../widgets/pipes/page-prop.pipe';
import { InnerPageTitleComponent } from '../../widgets/inner-page-title/inner-page-title.component';
import { FormsModule } from '@angular/forms';
import { EllipsePipe } from '../../widgets/ellipse.pipe';

@NgModule({
  declarations: [BannerWidget, CardWidget, CarouselWidget, ContentBoxWidget, FormWidget, ListWidget, MenuWidget, TextBoxWidget, AdaptPipe, LinkDirective, BtnComponent, TrustUrlPipe, PagePropPipe, InnerPageTitleComponent, EllipsePipe],
  imports: [
    CommonModule,
    FormsModule,
    NgxTinySliderModule,
    SharedModule
  ],
  exports: [BannerWidget, CardWidget, CarouselWidget, ContentBoxWidget, FormWidget, ListWidget, MenuWidget, TextBoxWidget, InnerPageTitleComponent]
})
export class WidgetBoxModule { }
