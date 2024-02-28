import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://127.0.0.1:8000/api";
  loggedIn: boolean = false;
  private userToken: string | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loggedIn = this.cookieService.check('auth_token')
  }

  createUser(email: string, name: string, password: string, birthdate: Date): Observable<any> {
    const userData = { email, name, password, birthdate };
    return this.http.post(`${this.url}/userregister`, userData);
  }

  login(username: string, password: string): Observable<any> {
    // Your login logic
    // After successful login, set cookie
    this.cookieService.set('auth_token', 'your_token_value');
    this.loggedIn = true;
    return this.http.post(`${this.url}/userlogin`, loginData)
  }

  logout(): Observable<any> {
    // Your logout logic
    // Remove the cookie and update loggedIn state
    this.cookieService.delete('auth_token');
    this.loggedIn = false;
    return this.http.post('/api/logout', {}); // Logout API endpoint
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  clearUserData(): void {
    this.userToken = null;
    this.loggedIn = false;
  }

  setCookie(name: string, value: string, days: number, domain: string, path: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    const domainString = domain ? `;domain=${domain}` : '';
    const pathString = path ? `;path=${path}` : '';
    document.cookie = `${name}=${value};${expires}${domainString}${pathString}`;
  }

  private getCookieValue(cookieName: string): string {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }

  private deleteCookie(cookieName: string): void {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
