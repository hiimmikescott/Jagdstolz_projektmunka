import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';

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
  constructor(private modalService: NgbModal) {}

  openLoginModal() {
    const modalRef = this.modalService.open(LoginModalComponent, { centered: true });
  }

}
