import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {
  reservable:boolean = true
  fishingplace_id:any
  private user_id = sessionStorage.getItem("id")
  startDate: any
  endDate:any
  constructor(private route: ActivatedRoute, private base:BaseService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const spot = history.state.spot;
      this.fishingplace_id=spot.id
      this.reservable=spot.reservable
    });
  }
  sendReservation(){
    const spotId = this.fishingplace_id
    const user_id = this.user_id
    const reservationStar= this.startDate
    const reservationEnd= this.endDate
    this.base.sendReservation(user_id,spotId,reservationStar,reservationEnd).subscribe((res)=>{
      console.log(res)
    })
  }
}
