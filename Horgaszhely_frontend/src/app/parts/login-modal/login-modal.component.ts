import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  constructor(public activeModal: NgbActiveModal, private auth : AuthService, private router: Router) {}
  email:any
  password:any
  submitForm() {
    this.activeModal.close();
  }
  login(){
    
    this.auth.login(this.email, this.password).subscribe(
{      next:(loginResponse:any) => {
        const domain = window.location.hostname;
        const path = window.location.pathname;
        this.router.navigate(['/home']);
        this.auth.loggedIn=true
        this.auth.setCookie('userToken', loginResponse.token, 7, domain, path);
        console.log(loginResponse)
      },
      error:(loginError) => {
        console.error('Login failed after registration', loginError);
      }}
    );
  }
}