import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotsComponent } from './spots.component';

describe('SpotsComponent', () => {
  let component: SpotsComponent;
  let fixture: ComponentFixture<SpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpotsComponent]
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
