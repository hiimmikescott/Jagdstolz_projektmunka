import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private url ="http://localhost:3000/"
  constructor(private http:HttpClient) { }
  getData(target:string){
    return this.http.get(this.url+target)
  }
  getSpotInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}api/spots/${id}`);
  }
}
