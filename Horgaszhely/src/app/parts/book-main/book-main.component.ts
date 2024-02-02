import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-main',
  templateUrl: './book-main.component.html',
  styleUrls: ['./book-main.component.css']
})
export class BookMainComponent {
  spotInfo: any
  
  parentContainerWidth = 1920; // Update this with the actual width
  parentContainerHeight = 1080; // Update this with the actual height

  constructor(private modalService: NgbModal) {}

  locations = [
    { id: 1, leftPercentage: (420 / this.parentContainerWidth) * 100, topPercentage: (200 / this.parentContainerHeight) * 100 },
    { id: 2, leftPercentage: (200 / this.parentContainerWidth) * 100, topPercentage: (560 / this.parentContainerHeight) * 100 },
    { id: 3, leftPercentage: (390 / this.parentContainerWidth) * 100, topPercentage: (700 / this.parentContainerHeight) * 100 },
    { id: 4, leftPercentage: (820 / this.parentContainerWidth) * 100, topPercentage: (760 / this.parentContainerHeight) * 100 },
    { id: 5, leftPercentage: (1040 / this.parentContainerWidth) * 100, topPercentage: (615 / this.parentContainerHeight) * 100 },
    { id: 6, leftPercentage: (1058 / this.parentContainerWidth) * 100, topPercentage: (293 / this.parentContainerHeight) * 100 },
  ];


  openSpotInfoModal(spotId: number) {
    // Set spot information before displaying the modal
    this.spotInfo = {
      helySzama: `Spot ${spotId}`,
      helyLeirasa: `Description for Spot ${spotId}`,
      slideshowImages: ['image1.jpg', 'image2.jpg', 'image3.jpg']
      // Add more fields as needed
    };
  }

  // Optional: Function to close the modal
  closeSpotInfoModal() {
    this.spotInfo = null;
  }


}
