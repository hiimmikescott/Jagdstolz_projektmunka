import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent {
  code: any
  email: string = "";
  password: string = "";

  constructor(private route: ActivatedRoute, private auth: AuthService, private router : Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.password = params['password'];

    });
  }

  verifyEmail() {
    this.auth.verifyEmail(this.code).subscribe((res) => {
      if(res.success==true){
        this.login()
      }
      else{
        let message = "Hibás ellenőrző kód, kéjük próbálja újra";
        this.showErrorMessage(message);
      }
    })
  }
  login(){
    let email = this.email
    let password = this.password
    const loginObj={
      email,password
    };
    this.auth.login(loginObj).subscribe((res)=>{
      if(res.success==true){
        this.showSuccessMessage()
        this.router.navigateByUrl("/home")
      }
      else{
        let message = "Hiba történt a bejelentkezés közben!";
        this.showErrorMessage(message)
      }
    })
  }

  showSuccessMessage() {
    let message = "Email címe sikeresen visszaigazolva!";
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  showErrorMessage(message:string) {
    this._snackBar.open(message, 'Bezárás', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
