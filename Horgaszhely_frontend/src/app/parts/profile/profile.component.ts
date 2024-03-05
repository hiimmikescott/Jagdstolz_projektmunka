import { Component } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

    name!:string
    email!:string
    birthdate!:Date

  constructor(private userHandling: BaseService, private _snackBar: MatSnackBar, protected dialog : MatDialog) { }

  
  ngOnInit() {
    this.getData()
  }

  updateProfile() {
    this.userHandling.updateProfile(this.birthdate,this.name,this.email).subscribe((res: any) => {
      if (res) {
        this.showSuccessMessage()
        this.getData()
      }
      else {
        console.error('Error updating profile: ',res.message);
      }
    }
    );
  }
  showSuccessMessage() {
    let message = "Profil sikeresen frissítve!"
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  getData(){
    const id = sessionStorage.getItem("id")
    this.userHandling.getUserData(id).subscribe((userData: any) => {
      this.name = userData.data.name
      this.email = userData.data.email
      this.birthdate = userData.data.birthdate
    });
  }

  tryDeleteUser(){
    
  }

  deleteUser(){
    const id = sessionStorage.getItem("id")
    this.userHandling.deleteUser(id)
  }
  
}