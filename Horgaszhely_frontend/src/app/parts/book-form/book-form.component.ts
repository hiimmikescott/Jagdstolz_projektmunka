
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  fishingplace_id: any;
  private user_id = sessionStorage.getItem("id");
  startDate: any;
  endDate: any;
  guestNumber: any;
  showAlert: any;
  customAlertMessage: string = '';
  errMessage:any;


  constructor(private route: ActivatedRoute, private base: BaseService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.startDate = new Date().toISOString().slice(0, 10);
    let date1 = new Date();
    this.endDate = new Date(date1.setDate(date1.getDate() + 1)).toISOString().slice(0, 10);
    this.guestNumber = 1;
    this.route.queryParams.subscribe(params => {
      this.fishingplace_id = params['id'];
    });
  }

  showSuccessMessage() {
    let message = "Sikeres foglalás!";
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  showErrorMessage(message: string) {
    this._snackBar.open(message, 'Bezárás', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  showCustomAlert(message:string) {
    this.errMessage=message;
    this.showAlert = true;
  }
  hideCustomAlert() {
    this.showAlert = false;
  }

  sendReservation() {
    const spotId = this.fishingplace_id;
    const user_id = this.user_id;
    const reservationStar = this.startDate;
    const reservationEnd = this.endDate;
    const guestNumber = this.guestNumber;

    this.base.sendReservation(user_id, spotId, reservationStar, reservationEnd, guestNumber)
      .subscribe((res) => {

        if (res && res.success == true) {
          console.log('Success response:', res);
          this.showSuccessMessage();
          this.router.navigateByUrl("/home");
        }
        else{
          this.showCustomAlert("Adatbeviteli hiba, kérjük ellenőrizze foglalás adatait.");
        }
      },
        (error) => {
          if (error.error.message=="erre az idöre már foglalt a hely") {
            this.showCustomAlert("Ez az időpont már foglalt, kérjük válasszon egy másikat!");
          }

        }
      );
  }



}
