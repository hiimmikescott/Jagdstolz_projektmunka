import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {
  reservable:boolean = true
  id:number=0
  startDate:Date = new Date
  endDate:Date = new Date
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const spotId = params.get('id');
      const spot = history.state.spot;
      this.id=spot.id
      this.reservable=spot.reservable
    });
  }
}
