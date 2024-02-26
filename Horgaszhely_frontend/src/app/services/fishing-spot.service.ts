import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FishingSpotService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getFishingSpots(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fishingplaces`);
  }


}
export interface Fishingspot{
  id:number
  reservable:boolean
  pier:boolean
  firepit:boolean
  shelter:boolean
  averageRating:number
  description:string
  longitude:number
  latitude:number
  images:string[]
}
