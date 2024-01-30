import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpotModalComponent } from '../spot-modal/spot-modal.component';

@Component({
  selector: 'app-book-main',
  templateUrl: './book-main.component.html',
  styleUrls: ['./book-main.component.css']
})
export class BookMainComponent {
  constructor(private modalService: NgbModal) {}

  openModal(spotId: number): void {
    const modalRef = this.modalService.open(SpotModalComponent, { size: 'lg' });
    console.log('Clicked on spot:', spotId);
  }
}
