import { Component } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  name!: string;
  email!: string;
  birthdate!: Date;

  constructor(private userHandling: BaseService, private _snackBar: MatSnackBar, protected dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.getData();
  }

  updateProfile() {
    this.userHandling.updateProfile(this.birthdate, this.name, this.email).subscribe((res: any) => {
      if (res) {
        this.showUpdateMessage();
        this.getData();
      } else {
        console.error('Error updating profile: ', res.message);
      }
    });
  }

  showUpdateMessage() {
    let message = "Profil sikeresen frissítve!";
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  showDeleteMessage() {
    let message = "Profil sikeresen törölve!";
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getData() {
    const id = sessionStorage.getItem("id");
    if (!id) {
      console.error('User ID is missing');
      return;
    }

    this.userHandling.getUserData(id).subscribe({
      next: (userData: any) => {
        if (userData && userData.data) {
          this.name = userData.data.name;
          this.email = userData.data.email;
          this.birthdate = userData.data.birthdate;
        } else {
          console.error('User data is invalid:', userData);
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }



  closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.dispose();
    }
  }

  deleteUser() {
    const id = sessionStorage.getItem("id");
    this.userHandling.deleteUser(id).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("role");
        this.router.navigateByUrl("/home");
        this.closeModal();
        this.showDeleteMessage();
      }
    });
  }
}
