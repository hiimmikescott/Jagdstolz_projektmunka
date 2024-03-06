import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean = false;
  private url = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {

  }

  createUser(email: any, name: any, password: any,password_confirmation:any, birthdate: any ): Observable<any> {
    const userData = { email, name, password, password_confirmation, birthdate };
    return this.http.post(`${this.url}/userregister`, userData);
  }

  login(loginObj:any){
    return this.http.post(`${this.url}/userlogin`,loginObj)
  }

  logout(token:string){
    const headers = new HttpHeaders(token)
    this.http.post(`${this.url}/userlogout`,{headers})
  }

  isLoggedIn(){
    if(sessionStorage.getItem("token")){
      return true
    }
    else{
      return false
    }
  }
}
