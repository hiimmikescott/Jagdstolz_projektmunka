import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReservationComponent } from './reservation.component';
import { BaseService } from '../../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationComponent],
      providers: [BaseService],
      imports: [HttpClientModule,FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
