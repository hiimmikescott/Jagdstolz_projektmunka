// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient, private baseService: BaseService) {}

  createUser(email: any, name: any, password: any, password_confirmation: any, birthdate: any): Observable<any> {
    const userData = { email, name, password, password_confirmation, birthdate };
    return this.http.post(`${this.url}/userregister`, userData);
  }

  login(loginObj: any): Observable<any> {
    return this.http.post(`${this.url}/userlogin`, loginObj);
  }

  logout(token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.url}/userlogout`, {}, { headers });
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem("token");
  }

  isAdmin(): Observable<boolean> {
    const userId = sessionStorage.getItem("id");

    if (userId) {
      return this.baseService.getUserData(userId).pipe(
        map((res: any) => {
          return res.data.userlevel === 5;
        }),
        catchError(() => of(false))
      );
    } else {
      return of(false);
    }
  }
  hasAnyRole(expectedRoles: string[]): boolean {
    const userRoles = this.getUserRolesFromService();
    return expectedRoles.some(role => userRoles.includes(role));
  }

  private getUserRolesFromService(): string[] {
    return ['user'];
  }
}
