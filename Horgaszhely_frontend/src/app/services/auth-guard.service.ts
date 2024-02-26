import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private auth:AuthService,private router:Router) {
  }
  canActivateFn(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{
    const isAuthorized = this.auth.isLoggedIn()
    if(isAuthorized){
      return true
    }else{
      return this.router.parseUrl("/login")
    }
  }
}
