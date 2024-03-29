// base.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private url ="http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { }

  // ---------------------------------------------------------spots--------------------------------------------------------------

  getData(target: string) {
    return this.http.get(this.url + target);
  }

  getSpotInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}spots/${id}`);
  }

  // ---------------------------------------------------------user--------------------------------------------------------------

  updateProfile(birthdate: Date, name: string, email: string): Observable<any> {
    const id = sessionStorage.getItem("id");
    const user = {
      id,
      birthdate,
      name,
      email
    };
    return this.http.put(`${this.url}modifyuser`, user);
  }

  getUserData(id: any): Observable<any> {
    return this.http.get(`${this.url}getuser?id=${id}`);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.url}deleteuser?id=${id}`);
  }

  // ---------------------------------------------------------reservations--------------------------------------------------------------

  sendReservation(user_id: any, fishingplace_id: any, reservationStart: any, reservationEnd: any, guestNumber: any) {
    const reservationData = {
      fishingplace_id,
      reservationEnd,
      reservationStart,
      user_id,
      guestNumber
    };
    return this.http.post(`${this.url}addreservation`, reservationData);
  }

  getUserReservations(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}getuserreservations?user_id=${id}`);
  }

  updateUserReservation(id: number, user_id: number, fishingplace_id: number, reservationStart: Date, reservationEnd: Date, guestNumber: number): Observable<any> {
    const reservation = {
      id,
      user_id,
      fishingplace_id,
      reservationStart,
      reservationEnd,
      guestNumber
    };
    return this.http.put<any>(`${this.url}modifyreservation`, reservation);
  }

  deleteUserReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}deletereservation?id=${id}`);
  }
} 
