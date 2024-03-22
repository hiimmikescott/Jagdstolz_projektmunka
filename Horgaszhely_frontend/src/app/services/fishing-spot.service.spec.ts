import { TestBed } from '@angular/core/testing';
import { FishingSpotService } from './fishing-spot.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('FishingSpotService', () => {
  let service: FishingSpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Include HttpClientModule
      providers: [FishingSpotService]
    });
    service = TestBed.inject(FishingSpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more test cases here...
});
