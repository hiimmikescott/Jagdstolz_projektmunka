import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import * as bootstrap from 'bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  reservations: any[] =[]
  id:any
  fishingplace_id:any
  user_id:any
  reservationStart: Date = new Date()
  reservationEnd: Date = new Date()
  guestNumber:any
  name:any

  constructor(private adm : AdminService, private _snackBar: MatSnackBar,private base:BaseService){}
  ngOnInit() {
    this.getReservations();
  }
  getReservations() {
    this.adm.getReservations().subscribe((res: any) => {
      if (res.success) {
        this.reservations = res.data;
        for (let i = 0; i < this.reservations.length; i++) {
          const reservation = this.reservations[i];
          this.getUser(reservation.user_id)
        }
      }
    });
  }
  updateReservationData(reservation: any) {
    this.id = reservation.id;
    this.user_id = reservation.user_id;
    this.fishingplace_id = reservation.fishingplace_id;
    this.reservationStart = reservation.reservationStart;
    this.reservationEnd = reservation.reservationEnd;
    this.guestNumber = reservation.guestNumber;

    this.getUser(this.user_id);
    this.openModal();
  }
  openModal() {
    const modalElement = document.getElementById('exampleModal');
  
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modális ablak nem található');
    }
  }
  deleteReservation(reservationId: number) {
    this.adm.deleteReservation(reservationId).subscribe(() => {
      this.getReservations();
    });
  }
  updateReservation() {
    this.adm.updateReservation(this.id,this.user_id,this.fishingplace_id,this.reservationStart,this.reservationEnd,this.guestNumber).subscribe((res: any) => {
      if (res) {
        this.showUpdateMessage()
        this.getReservations()
      }
      else {
        console.error('Hiba a hely módosítása közben: ',res.message);
      }
    }
    );
  }
  showUpdateMessage() {
    let message = "Foglalás sikeresen frissítve!"
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  getUser(id:any){
    this.base.getUserData(id).subscribe((res)=>{
      if(res){
        this.name=res.data.name
      }
      else{
        console.log("Hiba a név lekérésében",res.message)
      }
    })
  }
}
