
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService, private base: BaseService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const loginObj = {
        email, password
      };
      this.auth.login(loginObj).subscribe((res: any) => {
        console.log(res);
        if (res && !!res.success == true) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("id", res.data.id);
        setTimeout(() => {
          this.base.getUserData(res.data.id).subscribe((result) => {
            if (!!result.data.userlevel == true) {
              let role = "admin";
              sessionStorage.setItem("role", role);
              this.auth.updateRolesAfterLogin();
              this.router.navigateByUrl("/home");
              this.openSnackBar('Sikeres bejelentkezés', 'Bezárás');
            } else {
              let role = "user";
              sessionStorage.setItem("role", role);
              this.auth.updateRolesAfterLogin();
              this.router.navigateByUrl("/home");
              this.openSnackBar('Sikeres bejelentkezés', 'Bezárás');
            }
          });
        }, 2000)
        } else {
          this.openSnackBar('Hibás jelszó vagy email', 'Bezárás');
        }
      }, error => {
        this.openSnackBar("Email cím vagy jelszó nem megfelelő.", 'Bezárás');
      });
    } else {
      this.openSnackBar('Kérjük töltse ki a mezőket.', 'Bezárás');
    }
  }
  getRole(id:any){

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
