
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
  reservable: boolean = true;
  fishingplace_id: any;
  private user_id = sessionStorage.getItem("id");
  startDate: any;
  endDate: any;
  guestNumber: any;

  constructor(private route: ActivatedRoute, private base: BaseService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.startDate = new Date().toISOString().slice(0, 10);
    let date1 = new Date();
    this.endDate = new Date(date1.setDate(date1.getDate() + 1)).toISOString().slice(0, 10);
    this.guestNumber = 1;
    this.route.paramMap.subscribe((params) => {
      const spot = history.state.spot;
      console.log(spot)
      if (spot) {
        this.fishingplace_id = spot.id;
        this.reservable = spot.reservable;
      }
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

  sendReservation() {
    const spotId = this.fishingplace_id;
    const user_id = this.user_id;
    const reservationStar = this.startDate;
    const reservationEnd = this.endDate;
    const guestNumber = this.guestNumber;
    this.base.sendReservation(user_id, spotId, reservationStar, reservationEnd, guestNumber).subscribe((res) => {
      this.showSuccessMessage();
      this.router.navigateByUrl("/home");
    });
  }
}
