import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  openModal(content: any): NgbModalRef {
    return this.modalService.open(content, { centered: true });
  }
}
