import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://127.0.0.1:8000/api";
  loggedIn: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loggedIn = this.cookieService.check('auth_token');
  }

  createUser(email: string, name: string, password: string, birthdate: Date): Observable<any> {
    const userData = { email, name, password, birthdate };
    return this.http.post(`${this.url}/userregister`, userData);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/userlogin`, { username, password }).pipe(
      map((response: any) => {
        const token = response.token;
        this.cookieService.set('auth_token', token);
        this.loggedIn = true;
        return response;
      }),
      catchError((error: any) => {
        console.error('Login failed', error);
        return throwError(error);
      })
    );
  }

  logout(): Observable<any> {
    this.cookieService.delete('auth_token');
    this.loggedIn = false;
    return this.http.post(`${this.url}/userlogout`, {});
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  clearUserData(): void {
    this.loggedIn = false;
  }
}
