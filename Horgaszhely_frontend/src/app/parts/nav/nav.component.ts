import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @ViewChild('loginModal') loginModal!: ElementRef;
  close = true
  open(){
    this.close =!this.close
  }
  constructor(private modalService: NgbModal, private router:Router, protected auth:AuthService) {
  }

  loggedin(){
    let token = sessionStorage.getItem("token");
    if(token){
      return true
    }
    else{
      return false
    }
  }
  logout(){
    const token = sessionStorage.getItem("token");
    if(token){
      this.auth.logout(token)
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("id")
      this.router.navigateByUrl("/home")
    }
    else{
      alert("Már ki vagy jelenkezve")
    }
  }
  isAdmin(){
    if(sessionStorage.getItem("admin")=="true"){
      return true
    }
    else{
      return false
    }
  }
}

