import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMainComponent } from './book-main.component';

describe('BookMainComponent', () => {
  let component: BookMainComponent;
  let fixture: ComponentFixture<BookMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookMainComponent]
    });
    fixture = TestBed.createComponent(BookMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
