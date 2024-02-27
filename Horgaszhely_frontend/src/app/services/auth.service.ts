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

  constructor(private http: HttpClient) {
    const storedToken = this.getCookie('userToken');
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
    this.deleteCookie('userToken');
    this.loggedIn = false;
    return this.http.post(`${this.url}/userlogout`, {});
  }

  private setCookie(name: string, value: string, days: number, domain: string, path: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    const domainString = domain ? `;domain=${domain}` : '';
    const pathString = path ? `;path=${path}` : '';
    document.cookie = `${name}=${value};${expires}${domainString}${pathString}`;
  }

  private getCookie(name: string): string | null {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1];
    return cookieValue || null;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}
