import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser: Observable<any>;
  loggedIn: boolean = true;
  private url = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {
    this.currentUser = this.currentUserSubject.asObservable();
  }

  createUser(email: string, name: string, password: string, birthdate: Date): Observable<any> {
    const userData = { email, name, password, birthdate };
    return this.http.post(`${this.url}/userregister`, userData);
  }

 login(email:string, password:string){
    const credentials = {email,password}
    this.http.post(`${this.url}/userlogin`,credentials).subscribe((res:any)=>{
      if(res.result){
        console.log("fasza")
        localStorage.setItem("loginToken", res.data.token)
      }
    })
 }
}
