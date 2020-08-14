import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppDataService } from '../services/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class AppReadyGuard implements CanActivate {
  constructor(
    private appService: AppDataService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appService.appReady.pipe(
      filter(ready=>!!ready),
    );
  }
  
}
