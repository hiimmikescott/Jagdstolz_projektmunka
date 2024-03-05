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
  updateProfile(birthdate:Date,name:string,email:string): Observable<any> {
    const id = sessionStorage.getItem("id")
    const user = {
      id,birthdate,name,email
    }
    return this.http.put(`${this.url}modifyuser`, user);
  }
  getUserData(id:any): Observable<any>{
    return this.http.get(`${this.url}getuser?id=${id}`)
  }
  deleteUser(id:any){
    return this.http.delete(`${this.url}deleteuser?id=${id}`)
  }
} 
