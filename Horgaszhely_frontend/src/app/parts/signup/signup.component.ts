import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private auth: AuthService, private router: Router) { }
  email: any
  name: any
  password: any
  birthdate: Date = new Date()
  signUp() {
    this.auth.createUser(this.email, this.name, this.password, this.birthdate).subscribe(
      (response: any) => {
        console.log(response);
        const email = this.email;
        const password = this.password;
        const loginObj= {
          email,password
        }
        this.auth.login(loginObj).subscribe((res:any)=>{
          if(res){
            sessionStorage.setItem("token",res.data.token)
            sessionStorage.setItem("id",res.data.id)
            this.router.navigateByUrl("/home")
          }
          else{
            alert("sikertelen bejelenkezés")
          }
        })
      },
      (error: any) => {
        console.error('Sign-up error:', error);
        alert('A megadott email cím már regisztrálva van.');
      }
    );
  }
}
