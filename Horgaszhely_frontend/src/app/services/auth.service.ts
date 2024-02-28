import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://127.0.0.1:8000/api";
  loggedIn: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loggedIn = this.cookieService.check('auth_token');
  }

  createUser(email: string, name: string, password: string, birthdate: Date): Observable<any> {
    const userData = { email, name, password, birthdate };
    return this.http.post(`${this.apiUrl}/userregister`, userData);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/userlogin`, { username, password })
      .pipe(
        map((response: any) => {
          const authToken = response.token;
          this.cookieService.set('auth_token', authToken);
          this.loggedIn = true;
          return response;
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/userlogout`, {})
      .pipe(
        finalize(() => {
          this.cookieService.delete('auth_token');
          this.loggedIn = false;
        })
      );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
Argument of type 'unknown[]' is not assignable to parameter of type 'OperatorFunction<Object, any>'.
  Type 'unknown[]' provides no match for the signature '(source: Observable<Object>): Observable<any>'.