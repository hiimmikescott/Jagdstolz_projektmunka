import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../parts/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string, name: string, username: string, birthDate: Date) {
    const authData: AuthData = { email: email, password: password, name: name, username: username, birthDate: birthDate }
    this.http.post("https://jsonplaceholder.typicode.com/users", authData).subscribe((response) => console.log(response))
  }
}
