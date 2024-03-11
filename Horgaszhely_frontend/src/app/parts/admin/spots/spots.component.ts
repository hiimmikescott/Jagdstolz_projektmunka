import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from '../../../services/base.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-spots',
  templateUrl: './spots.component.html',
  styleUrl: './spots.component.css'
})
export class SpotsComponent {
  fishingplaces: any[] =[]
  id:number=0
  reservable:boolean = true
  firepit:boolean = true
  pier:boolean = true
  shelter:boolean = true
  description:string=""
  longitude:number=0
  latitude:number=0

  constructor(private adm : AdminService, private _snackBar: MatSnackBar,private base:BaseService){}
  ngOnInit() {
    this.getFishingplaces();
  }
  getFishingplaces() {
    this.adm.getFishingspots().subscribe((res: any) => {
      if (res.success) {
        this.fishingplaces = res.data;
      }
    });
  }
  updateFishingplaceData(fishingspot: any) {
    this.id = fishingspot.id;
    this.reservable = !!fishingspot.reservable;
    this.firepit = !!fishingspot.firepit;
    this.pier = !!fishingspot.pier;
    this.shelter = !!fishingspot.shelter;
    this.description = fishingspot.description;
    this.longitude = fishingspot.longitude;
    this.latitude = fishingspot.latitude;
    this.openUpdateModal();
  }
  addFishingplaceData() {
    this.openAddModal();
  }
  openUpdateModal() {
    const modalElement = document.getElementById('updateModal');
  
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modális ablak nem található');
    }
  }
  openAddModal() {
    const modalElement = document.getElementById('addModal');
  
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modális ablak nem található');
    }
  }
  deleteFishingplace(id: number) {
    this.adm.deleteFishingspot(id).subscribe(() => {
      this.getFishingplaces();
    });
  }
  updateFishingplace() {
    this.adm.updateFishingspot(this.id,this.reservable,this.firepit,this.pier,this.shelter,this.description,this.longitude,this.latitude).subscribe((res: any) => {
      if (res) {
        this.showUpdateMessage()
        this.getFishingplaces()
      }
      else {
        console.error('Hiba a hely módosítása közben: ',res.message);
      }
    }
    );
  }
  addFishingplace() {
    this.adm.addFishingplace(this.id,this.reservable,this.firepit,this.pier,this.shelter,this.description,this.longitude,this.latitude).subscribe((res: any) => {
      if (res) {
        this.showAddMessage()
        this.getFishingplaces()
      }
      else {
        console.error('Hiba a hely hozzáadása közben: ',res.message);
      }
    }
    );
  }
  showUpdateMessage() {
    let message = "Horgászhely sikeresen frissítve!"
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  showAddMessage() {
    let message = "Horgászhely sikeresen felvéve!"
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
