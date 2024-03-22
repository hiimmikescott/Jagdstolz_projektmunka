
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  description: string = '';
  selectedFile: File | null = null;
  images: any[] = [];
  loggedInUserId = sessionStorage.getItem("id");
  newDescription: string = '';
  editingImage: any;
  @ViewChild('editModal') editModal!: ElementRef;

  constructor(private _snackBar: MatSnackBar, private imageService: ImageService, private base: BaseService) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages() {
    this.imageService.getImages().subscribe(
      (images: any[]) => {
        for (const image of images) {
          this.base.getUserData(image.user_id).subscribe(
            (user: any) => {
              image.uploadedBy = user.data.name;
            },
            error => {
              console.error('Error fetching user:', error);
            }
          );
        }
        this.images = images;
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
  }

  canModifyOrDelete(image: any): boolean {
    if (this.loggedInUserId == image.user_id || sessionStorage.getItem("role") == "admin") {
      return true;
    } else {
      return false;
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('Kérem válasszon egy képet');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('description', this.description);

    const id = sessionStorage.getItem("id");
    if (id) {
      formData.append('user_id', id);
    } else {
      console.error('User id is null');
      return;
    }

    this.imageService.uploadImage(formData).subscribe(
      response => {
        console.log('Kép feltöltve:', response);
        this._snackBar.open('Kép sikeresen feltöltve', 'Bezárás', {
          duration: 3000,
        });
        this.fetchImages();
        this.description = '';
        this.selectedFile = null;
      },
      error => {
        console.error('Hiba a kép feltöltése közben:', error);
        this._snackBar.open('Kép feltöltése sikertelen, kérjük próbálja meg újra.', 'Bezárás', {
          duration: 3000,
        });
      }
    );
  }

  deleteImage(imageId: number) {
    this.imageService.deleteImage(imageId).subscribe(
      response => {
        console.log('Kép sikeresen törölve:', response);
        this.fetchImages();
        this._snackBar.open('Kép sikeresen törölve', 'Bezárás', {
          duration: 3000,
        });
      },
      error => {
        console.error('Error deleting image:', error);
        this._snackBar.open('Hiba a kép törlése közben, kérjük próbálja újra.', 'Bezárás', {
          duration: 3000,
        });
      }
    );
  }

  modifyImageDescription(image: any, newDescription: string): void {
    this.imageService.modifyImage(image.id, newDescription).subscribe(
      response => {
        console.log('Poszt módosítása sikeres:', response);
        this._snackBar.open('Poszt sikeresen módosítva', 'Bezárás', {
          duration: 3000,
        });
        this.fetchImages();
      },
      error => {
        console.error('Hiba a poszt módosítása közben:', error);
        this._snackBar.open('Hiba a poszt módosítása közben, kéjük próbálja újra.', 'Bezárás', {
          duration: 3000,
        });
      }
    );
  }

  openEditModal(image: any): void {
    this.editingImage = image;
    this.newDescription = image.description;
  }

  onEditSubmit(): void {
    if (this.editingImage) {
      this.modifyImageDescription(this.editingImage, this.newDescription);
    }
  }
}
