import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @ViewChild('loginModal') loginModal!: ElementRef;
  close = true;
  rule: boolean = false;

  constructor(private router: Router, protected auth: AuthService) { }

  open() {
    this.close = !this.close;
  }

  loggedIn() {
    let token = sessionStorage.getItem("token");
    return !!token;
  }

  isAdmin() {
    return sessionStorage.getItem("role") === "admin";
  }

  logout() {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.auth.logout(token);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("role");
      this.router.navigateByUrl("/home");
    } else {
      alert("Már ki vagy jelenkezve");
    }
  }
}
