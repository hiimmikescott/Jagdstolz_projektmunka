import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  close = true
  open(){
    this.close =!this.close
  }
  openModal(){
    const modalDiv = document.getElementById("loginModal")
    if (modalDiv!= null) {
      modalDiv.style.display = "block"
      modalDiv.style.boxShadow= ""
    }
  }
  closeModal(){
    const modalDiv = document.getElementById("loginModal")
    if (modalDiv!= null) {
      modalDiv.style.display = "none"
    }
  }
}
