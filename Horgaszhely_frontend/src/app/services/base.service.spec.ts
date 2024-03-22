import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
