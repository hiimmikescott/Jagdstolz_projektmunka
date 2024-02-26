import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FishingSpotService {
  private apiUrl = 'localhost:8000';

  constructor(private http: HttpClient) { }

  getFishingSpots(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fishingplaces`);
  }

}
