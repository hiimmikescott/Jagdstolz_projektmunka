import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery.component';
import { ImageService } from '../../services/image.service';
import { HttpClientModule } from '@angular/common/http';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryComponent],
      providers: [ImageService],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
