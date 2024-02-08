import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private auth:AuthService){}
  email:any
  name:any
  username:any
  password:any
  birthDate:any
  signUp(){
    this.auth.createUser(this.email,this.name,this.username,this.password,this.birthDate);
  }
}
