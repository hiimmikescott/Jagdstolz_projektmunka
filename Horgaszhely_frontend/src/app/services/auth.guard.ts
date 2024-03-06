// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.auth.isLoggedIn()) {
      // Accessing 'roles' using square bracket notation
      const expectedRoles = (route.data as any)['roles'] as Array<string>;

      if (expectedRoles && !this.auth.hasAnyRole(expectedRoles)) {
        // User doesn't have the required roles for this route
        this.router.navigate(['/unauthorized']);
        return false;
      }

      return true;
    } else {
      // User is not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}
