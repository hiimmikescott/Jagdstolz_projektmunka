import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-main',
  templateUrl: './book-main.component.html',
  styleUrls: ['./book-main.component.css']
})
export class BookMainComponent {
  spotInfo: any


  parentContainerWidth: number = window.innerWidth
  parentContainerHeight: number = window.innerHeight

  locations = [
    { id: 1, leftPercentage: (680 / this.parentContainerWidth) * 100, topPercentage: (200 / this.parentContainerHeight) * 100 },
    { id: 2, leftPercentage: (230 / this.parentContainerWidth) * 100, topPercentage: (560 / this.parentContainerHeight) * 100 },
    { id: 3, leftPercentage: (390 / this.parentContainerWidth) * 100, topPercentage: (700 / this.parentContainerHeight) * 100 },
    { id: 4, leftPercentage: (820 / this.parentContainerWidth) * 100, topPercentage: (780 / this.parentContainerHeight) * 100 },
    { id: 5, leftPercentage: (1600 / this.parentContainerWidth) * 100, topPercentage: (615 / this.parentContainerHeight) * 100 },
    { id: 6, leftPercentage: (1580 / this.parentContainerWidth) * 100, topPercentage: (293 / this.parentContainerHeight) * 100 },
  ];

  @ViewChild('imageContainer') imageContainer!: ElementRef

  constructor(private modalService: NgbModal, private viewportScroller: ViewportScroller) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {

    this.parentContainerWidth = window.innerWidth;
    this.parentContainerHeight = window.innerHeight;
    console.log(this.parentContainerHeight)
    console.log(this.parentContainerWidth)
  }

  openSpotInfoModal(spotId: number) {
    this.spotInfo = {
      helySzama: `Spot ${spotId}`,
      helyLeirasa: `Description for Spot ${spotId}`,
      slideshowImages: ['../../../assets/images/nomnom.jpg', '../../../assets/images/therapist.jpg', '../../../assets/images/giganigga.jpg']
    };
  }

  closeSpotInfoModal() {
    this.spotInfo = null;
  }
}
