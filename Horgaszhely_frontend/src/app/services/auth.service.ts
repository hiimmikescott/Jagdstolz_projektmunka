import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://127.0.0.1:8000/api";
  loggedIn: boolean = false;
  private userToken: string | null = null;

  constructor(private http: HttpClient) {
    const storedToken = this.getCookieValue('userToken');
    if (storedToken) {
      this.loggedIn = true;
    }
  }

  createUser(email: string, name: string, password: string, birthdate: Date): Observable<any> {
    const userData = { email, name, password, birthdate };
    return this.http.post(`${this.url}/userregister`, userData);
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.url}/userlogin`, loginData).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setCookie('userToken', response.token, 7, 'yourdomain.com', '/'); // Adjust domain and path accordingly
          this.loggedIn = true;
        }
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getCookieValue('token');

    if (!token) {
      console.error('Token not found in cookies.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.deleteCookie('token');

    return this.http.post<any>(`${this.url}/userlogout`, {}, { headers });
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
