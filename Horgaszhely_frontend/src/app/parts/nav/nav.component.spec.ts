import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [AuthService],
      imports: [HttpClientModule,NgbCollapse]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
