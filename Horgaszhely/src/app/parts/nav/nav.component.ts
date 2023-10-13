import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  doc ={
    email : document.querySelector("email"),
    password : document.querySelector("pwd")
  }
  close = true
  open(){
    this.close =!this.close
  }
  openModal(){
    const modalDiv = document.getElementById("loginModal")
    if (modalDiv!= null) {
      modalDiv.style.display = "block"
    }
  }
  closeModal(){
    const modalDiv = document.getElementById("loginModal")
    if (modalDiv!= null) {
      modalDiv.style.display = "none"
    }
    this.clearModalFields()
  }
  clearModalFields(){
  }
  rememberMe(){

  }
}
