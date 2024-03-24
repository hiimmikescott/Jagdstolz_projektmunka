import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = next.data['roles'] as Array<string>;
    const userRole = sessionStorage.getItem('role');
    const routePath = state.url;

    if (!userRole) {
      if (routePath !== '/reservation' && routePath !== '/profile') {
        return true;
      } else {
        this.snackBar.open('A funkcióhoz kérem jelentkezzen be.', 'Bezár', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error']
        });
        this.router.navigateByUrl("/home");
        return false;
      }
    } else {
      if (routePath === '/register') {
        this.snackBar.open('A regisztrációhoz nincs jogosultsága.', 'Bezár', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error']
        });
        this.router.navigateByUrl("/home");
        return false;
      } else if (routePath === '/login') {
        this.router.navigateByUrl("/home");
        return false;
      } else if (roles.includes(userRole)) {
        return true;
      } else {
        this.snackBar.open('Nincs jogosultsága ehhez a művelethez.', 'Bezár', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error']
        });
        this.router.navigateByUrl("/home");
        return false;
      }
    }
  }
}
