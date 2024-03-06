import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private auth: AuthService, private router: Router, private _snackBar: MatSnackBar) { }
  email: any
  name: any
  password: any
  password_confirmation: any
  birthdate: Date = new Date()
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
  signUp() {
    if (this.isFormValid()) {
      this.auth.createUser(this.email, this.name, this.password, this.password_confirmation, this.birthdate).subscribe(
        (response: any) => {
          const email = this.email;
          const password = this.password;
          const loginObj = {
            email, password
          }
          this.auth.login(loginObj).subscribe((res: any) => {
            if (res) {
              this.showSuccessMessage()
              sessionStorage.setItem("token", res.data.token)
              sessionStorage.setItem("id", res.data.id)
              this.router.navigateByUrl("/home")
            }
            else {
              alert("sikertelen bejelenkezés")
            }
          })
        },
        (error: any) => {
          console.error('Sign-up error:', error);
          alert('A megadott email cím már regisztrálva van.');
        }
      );
    } else {
      console.error('Form is not valid. Please check the entered information.');
    }
  }
  showSuccessMessage() {
    let message = "Sikeres regisztráció!"
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
