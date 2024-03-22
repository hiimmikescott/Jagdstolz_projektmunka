import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SpotsComponent } from './spots.component';
import { FormsModule } from '@angular/forms';

describe('SpotsComponent', () => {
  let component: SpotsComponent;
  let fixture: ComponentFixture<SpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpotsComponent],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
