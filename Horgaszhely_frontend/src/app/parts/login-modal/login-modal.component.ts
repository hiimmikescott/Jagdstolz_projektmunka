import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private router: Router) {}
  url="http://127.0.0.1:8000/api"
  loginObj:any ={
    "email":"",
    "password":""
  }
  submitForm() {
    this.activeModal.close();
  }

  login(){
    this.http.post(`${this.url}/userlogin`,this.loginObj).subscribe((res:any)=>{
      if(res.result){
        console.log("fasza: "+res)
        localStorage.setItem("loginToken", res.data.token)
      }
      console.log("nem fasza")
    })
 }
}
