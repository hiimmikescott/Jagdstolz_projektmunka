import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser: Observable<any>;
  loggedIn: boolean = false;
  private url = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {
    this.currentUser = this.currentUserSubject.asObservable();
  }

  createUser(email: string, name: string, password: string, birthdate: Date): Observable<any> {
    const userData = { email, name, password, birthdate };
    return this.http.post(`${this.url}/userregister`, userData);
  }

  logout(token:string){
    const headers = new HttpHeaders(token)
    this.http.post(`${this.url}/userlogout`,{headers})
  }
}
