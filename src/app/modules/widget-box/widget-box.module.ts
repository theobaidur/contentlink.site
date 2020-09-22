import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardWidget } from '../../widgets/card/card.widget';
import { CarouselWidget } from '../../widgets/carousel/carousel.widget';
import { ListWidget } from '../../widgets/list/list.widget';
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
import { DynamicDetailViewComponent } from '../../widgets/dynamic-detail-view/dynamic-detail-view.component';
import { RichTextViewerComponent } from '../../widgets/rich-text-viewer/rich-text-viewer.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { WithBreakPipe } from '../../widgets/pipes/with-break.pipe';
import { TrustHtmlPipe } from '../../widgets/pipes/trust-html.pipe';
import { CustomHtmlComponent } from '../../widgets/custom-html/custom-html.component';

@NgModule({
  declarations: [CardWidget, CarouselWidget, ListWidget, AdaptPipe, LinkDirective, BtnComponent, TrustUrlPipe, PagePropPipe, InnerPageTitleComponent, EllipsePipe, DynamicDetailViewComponent, RichTextViewerComponent, MenuComponent, WithBreakPipe, TrustHtmlPipe, CustomHtmlComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxTinySliderModule,
    SharedModule
  ],
  exports: [CardWidget, CarouselWidget, ListWidget, InnerPageTitleComponent, DynamicDetailViewComponent, RichTextViewerComponent, MenuComponent, WithBreakPipe, TrustHtmlPipe, CustomHtmlComponent]
})
export class WidgetBoxModule { }
