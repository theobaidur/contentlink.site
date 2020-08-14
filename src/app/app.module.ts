import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './modules/shared/shared.module';
import { WidgetBoxModule } from './modules/widget-box/widget-box.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageBaseComponent } from './pages/page-base/page-base.component';
import { DefaultLayoutComponent } from './pages/default-layout/default-layout.component';
import { InnerPageSidebarLayoutComponent } from './pages/inner-page-sidebar-layout/inner-page-sidebar-layout.component';
import { InnerPageNoSidebarLayoutComponent } from './pages/inner-page-no-sidebar-layout/inner-page-no-sidebar-layout.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    PageBaseComponent,
    DefaultLayoutComponent,
    InnerPageSidebarLayoutComponent,
    InnerPageNoSidebarLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    WidgetBoxModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
