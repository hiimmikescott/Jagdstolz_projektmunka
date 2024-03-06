import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private url = "http://127.0.0.1:8000/api";
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router:Router, private auth:AuthService,private base : BaseService){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const loginObj= {
        email,password
      }
      this.auth.login(loginObj).subscribe((res:any)=>{
        if(res){
          this.base.getUserData(res.data.id).subscribe((result)=>{
            if(result.data.userlevel=="5"){
              let role = "admin"
              sessionStorage.setItem("role",role)
              sessionStorage.setItem("token",res.data.token)
              sessionStorage.setItem("id",res.data.id)
              this.auth.updateRolesAfterLogin();
              this.router.navigateByUrl("/home")
            }else{
              let role = "user"
              sessionStorage.setItem("role",role)
              sessionStorage.setItem("token",res.data.token)
              sessionStorage.setItem("id",res.data.id)
              this.auth.updateRolesAfterLogin();
              this.router.navigateByUrl("/home")
            }
          })
        }
        else{
          alert("Hibás jelszó vagy email")
        }
      })
    }
    else{
      return alert("Hibás formátum")
    }
  }
}
