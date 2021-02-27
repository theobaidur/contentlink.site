import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomRouterLinkDirective } from '../../directives/custom-router-link.directive';
import { SrcPipe } from '../../pipes/src.pipe';
import { Base64Pipe } from '../../pipes/base64.pipe';



@NgModule({
  declarations: [CustomRouterLinkDirective, SrcPipe, Base64Pipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    CustomRouterLinkDirective,
    SrcPipe,
    Base64Pipe
  ]
})
export class SharedModule { }
