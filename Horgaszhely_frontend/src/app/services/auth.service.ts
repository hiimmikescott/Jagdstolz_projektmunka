import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private url="http://127.0.0.1:8000/api"

  createUser(email: string, password: string, name: string, birthDate: Date) {
    const authData: AuthData = { email: email, password: password, name: name, birthDate: birthDate }
    this.http.post(`${this.url}/userregister`, authData).subscribe((response) => console.log(response))
  }

  isLoggedIn(){
    return true
  }
}
