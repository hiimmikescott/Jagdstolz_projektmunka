import { TestBed } from '@angular/core/testing';

import { FishingSpotService } from './fishing-spot.service';

describe('FishingSpotService', () => {
  let service: FishingSpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishingSpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
