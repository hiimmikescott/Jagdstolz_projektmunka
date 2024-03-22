import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RoleGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['isAdmin']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl']) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    guard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true and allow navigation if user is admin', () => {
    authService.isAdmin.and.returnValue(true);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = { url: '/test-url' } as RouterStateSnapshot;

    const result = guard.canActivate(route, state);

    expect(result).toBe(true);
    expect(authService.isAdmin).toHaveBeenCalledOnceWith();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should return false and navigate to home if user is not admin', () => {
    authService.isAdmin.and.returnValue(false);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = { url: '/test-url' } as RouterStateSnapshot;

    const result = guard.canActivate(route, state);

    expect(result).toBe(false);
    expect(authService.isAdmin).toHaveBeenCalledOnceWith();
    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/home');
  });
});
