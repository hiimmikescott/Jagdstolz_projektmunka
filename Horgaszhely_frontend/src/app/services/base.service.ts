import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private url ="http://127.0.0.1:8000/api/"
  constructor(private http:HttpClient) { }
  getData(target:string){
    return this.http.get(this.url+target)
  }
  getSpotInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}spots/${id}`);
  }
  sendReservation(user_id:any,fishingplace_id:any,reservationStart:any,reservationEnd:any,guestNumber:any){
    const reservationData={
      fishingplace_id,reservationEnd,reservationStart,user_id,guestNumber
    }
    return this.http.post(`${this.url}addreservation`,reservationData)
  }
}
