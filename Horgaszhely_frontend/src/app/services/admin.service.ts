import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = "http://127.0.0.1:8000/api";
  private token = sessionStorage.getItem("token")

  constructor(private http :HttpClient) { }

  // ---------------------------------------------------------users--------------------------------------------------------------

  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getusers`)
  }

  deleteUser(userId: number): Observable<void> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    return this.http.delete<void>(`${this.url}/deleteuser?id=${userId}`,{headers});
  }

  updateUser(id:number,birthdate:Date,name:string,email:string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    const user ={
      id,name,email,birthdate
    }
    return this.http.put<any>(`${this.url}/modifyuser`,user,{headers});
  }

  // ---------------------------------------------------------reservations--------------------------------------------------------------

  getReservations():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getreservations`)
  }

  getReservation(id:any): Observable<any>{
    return this.http.get(`${this.url}/getreservation?id=${id}`)
  }

  updateReservation(id:number,user_id:number,fishingplace_id:number,reservationStart:Date,reservationEnd:Date,guestNumber:number): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    const reservation ={
      id,user_id,fishingplace_id,reservationStart,reservationEnd,guestNumber
    }
    return this.http.put<any>(`${this.url}/modifyreservation`,reservation,{headers});
  }

  deleteReservation(userId: number): Observable<void> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    return this.http.delete<void>(`${this.url}/deletereservation?id=${userId}`,{headers});
  }

  // ---------------------------------------------------------fishingspots--------------------------------------------------------------

  getFishingspots():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/fishingplaces`)
  }

  getFishingspot(id:any): Observable<any>{
    return this.http.get(`${this.url}/fishingplace?id=${id}`)
  }

  addFishingplace(id:number,reservable:boolean,pier:boolean,firepit:boolean,shelter:boolean,description:string,longitude:number,latitude:number): Observable<any>{
    const fishingplace ={
      id,reservable,pier,firepit,shelter,description,longitude,latitude
    }
    return this.http.post<any>(`${this.url}/addfishingplace`,fishingplace);
  }

  updateFishingspot(id:number,reservable:boolean,pier:boolean,firepit:boolean,shelter:boolean,description:string,longitude:number,latitude:number): Observable<any> {
    const fishingplace ={
      id,reservable,pier,firepit,shelter,description,longitude,latitude
    }
    return this.http.put<any>(`${this.url}/modifyfishingplace`,fishingplace);
  }

  deleteFishingspot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deletefishingplace?id=${id}`);
  }
}
