import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookFormComponent } from './book-form.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      imports: [RouterTestingModule, HttpClientModule,FormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'mockParam' // Provide a mock value for the route parameter
              }
            },
            paramMap: of({
              get: (key: string) => 'mockParam' // Provide a mock value for paramMap as an observable
            })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
