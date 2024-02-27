import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @ViewChild('loginModal') loginModal!: ElementRef;
  close = true
  logged = false
  open(){
    this.close =!this.close
  }
  constructor(private modalService: NgbModal, public auth: AuthService, private router:Router) {
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginModalComponent, { centered: true });
  }

  logout(){
    const logoutSubscription = this.auth.logout();
    this.auth.loggedIn=false

    logoutSubscription.subscribe(
      {
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Logout failed', error);
        }
      }
    );
  }
}

