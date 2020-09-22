import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageBaseComponent } from './pages/page-base/page-base.component';
import { AppReadyGuard } from './guards/app-ready.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageBaseComponent,
    canActivate: [AppReadyGuard]
  },
  {
    path: ':page',
    component: PageBaseComponent,
    canActivate: [AppReadyGuard],
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
