import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface ClickableSpot {
  id: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-spot-modal',
  templateUrl: './spot-modal.component.html',
  styleUrls: ['./spot-modal.component.css']
})
export class SpotModalComponent implements OnInit {
  @Input() spotId: number = 0;
  clickableSpots: ClickableSpot[] = [];
  defaultMarkerImagePath: string = 'assets/images/marker.png';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    // Simulated backend data (replace this with actual data retrieval logic)
    this.getClickableSpotsFromBackend();
  }

  getClickableSpotsFromBackend(): void {
    // Simulate fetching data from the backend
    // Replace this with your actual backend API call
    // Sample data - replace with your actual data structure
    const backendData: ClickableSpot[] = [
      { id: 1, x: 100, y: 150 },
      { id: 2, x: 250, y: 300 },
      // Add more spots as needed
    ];

    this.clickableSpots = backendData;
  }
}
