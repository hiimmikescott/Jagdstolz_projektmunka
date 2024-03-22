import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BookMainComponent } from './book-main.component';
import { MapComponent } from '../map/map.component';

describe('BookMainComponent', () => {
  let component: BookMainComponent;
  let fixture: ComponentFixture<BookMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookMainComponent, MapComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
