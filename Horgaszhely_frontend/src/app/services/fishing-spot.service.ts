import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FishingSpotService {
  getFishingSpots(): Observable<FishingSpot[]> {
    const fishingSpots: FishingSpot[] = [
      {
        reservable: true,
        pier: false,
        firepit: true,
        shelter: false,
        averageRating: 4,
        description: 'Great fishing spot!',
        longitude:  19.572352,
        latitude: 47.536311,
        images: [
          "../../../assets/images/giganigga.jpg",
          "../../../assets/images/hogrider.jpg",
          "../../../assets/images/stepmom.jpg"
        ]
      },
      {
        reservable: true,
        pier: false,
        firepit: true,
        shelter: false,
        averageRating: 4,
        description: 'Great fishing spot!',
        longitude: 19.572169,
        latitude: 47.534790,
        images: [
          "../../../assets/images/giganigga.jpg",
          "../../../assets/images/hogrider.jpg",
          "../../../assets/images/stepmom.jpg"
        ]
      },
      {
        reservable: true,
        pier: false,
        firepit: true,
        shelter: false,
        averageRating: 4,
        description: 'Great fishing spot!',
        longitude: 19.570300,
        latitude: 47.535814,
        images: [
          "../../../assets/images/giganigga.jpg",
          "../../../assets/images/hogrider.jpg",
          "../../../assets/images/stepmom.jpg"
        ]
      },
      {
        reservable: true,
        pier: false,
        firepit: true,
        shelter: false,
        averageRating: 4,
        description: 'Great fishing spot!',
        longitude: 19.567223,
        latitude: 47.537463,
        images: [
          "../../../assets/images/giganigga.jpg",
          "../../../assets/images/hogrider.jpg",
          "../../../assets/images/stepmom.jpg"
        ]
      },
      {
        reservable: true,
        pier: false,
        firepit: true,
        shelter: false,
        averageRating: 4,
        description: 'Great fishing spot!',
        longitude: 19.566816,
        latitude: 47.538346,
        images: [
          "../../../assets/images/giganigga.jpg",
          "../../../assets/images/hogrider.jpg",
          "../../../assets/images/stepmom.jpg"
        ]
      },
      {
        reservable: true,
        pier: false,
        firepit: true,
        shelter: false,
        averageRating: 4,
        description: 'Great fishing spot!',
        longitude: 19.574025,
        latitude: 47.535666,
        images: [
          "../../../assets/images/giganigga.jpg",
          "../../../assets/images/hogrider.jpg",
          "../../../assets/images/stepmom.jpg"
        ]
      }
    ];

    return of(fishingSpots);
  }
}

export interface FishingSpot {
  reservable: boolean;
  pier: boolean;
  firepit: boolean;
  shelter: boolean;
  averageRating: number;
  description: string;
  longitude: number;
  latitude: number;
  images: string[];
}
