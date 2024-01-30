import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotModalComponent } from './spot-modal.component';

describe('SpotModalComponent', () => {
  let component: SpotModalComponent;
  let fixture: ComponentFixture<SpotModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotModalComponent]
    });
    fixture = TestBed.createComponent(SpotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
