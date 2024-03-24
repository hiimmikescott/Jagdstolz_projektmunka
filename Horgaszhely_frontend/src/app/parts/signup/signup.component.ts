import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private auth: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  email: any;
  name: any;
  password: any;
  password_confirmation: any;
  birthdate: Date = new Date();
  code: number = 0;

  async submitVerificationCode() {
    try {
      const isVerified = await this.verifyUser(this.code);
      if (isVerified) {
        this.closeModal();
      }
    } catch (error) {
      console.error('Verification error:', error);
    }
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isFormValid(): boolean {
    const isNameValid = !!this.name;
    const isEmailValid = this.isValidEmail(this.email);
    const isPasswordValid = !!this.password && this.password.length >= 6;
    const isPasswordConfirmationValid = this.password_confirmation === this.password;
    const isBirthdateValid = !!this.birthdate;

    return (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordConfirmationValid &&
      isBirthdateValid
    );
  }

  async signUp() {
    this.openModal();
    if (this.isFormValid()) {
      try {
        const res = await this.auth.createUser(this.email, this.name, this.password, this.password_confirmation, this.birthdate).subscribe((res)=>{
          console.log(res)
        });
        const email = this.email;
        const password = this.password;
        const loginObj = { email, password };

        const isVerified = await this.verifyUser(this.code);

        if (isVerified) {
          const loginRes = await this.auth.login(loginObj).toPromise();
          if (loginRes) {
            this.showSuccessMessage();
            sessionStorage.setItem("token", loginRes.data.token);
            sessionStorage.setItem("id", loginRes.data.id);
            this.router.navigateByUrl("/home");
          } else {
            this.showErrorMessage("Sikertelen bejelentkezés visszaigazolás hiánya miatt");
          }
        } else {
          this.showErrorMessage("Sikertelen fiók visszaigazolás!");
        }
      } catch (error) {
        console.error('Regisztrációs hiba:', error);
        this.showErrorMessage('A megadott email cím már regisztrálva van.');
      }
    } else {
      this.showErrorMessage('Az űrlap nem érvényes. Kérjük, ellenőrizze a megadott információkat.');
    }
  }

  showErrorMessage(message: string) {
    this._snackBar.open(message, 'Bezárás', {
      duration: 3000,
    });
  }

  showSuccessMessage() {
    let message = "Sikeres regisztráció!";
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  verifyUser(code:number) {
    let resp
   this.auth.verifyEmail(code).subscribe((res)=>{
     console.log(res)
    if(res.success==true){
      resp=true
    }
    else{
      resp=false
    }
   })
   return resp
  }

  openModal() {
    const modalElement = document.getElementById('verificationModal');

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modális ablak nem található');
    }
  }

  closeModal() {
    const modalElement = document.getElementById('verificationModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      } else {
        console.error('Modal instance not found');
      }
    } else {
      console.error('Modal element not found');
    }
  }

}
