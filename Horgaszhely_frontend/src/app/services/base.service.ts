// base.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private url ="http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { }

  // ---------------------------------------------------------spots--------------------------------------------------------------


  getSpotInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}spots/${id}`);
  }

  // ---------------------------------------------------------user--------------------------------------------------------------

  updateProfile(birthdate: Date, name: string, email: string): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const id = sessionStorage.getItem("id");
    const user = {
      id,
      birthdate,
      name,
      email
    };
    return this.http.put(`${this.url}modifyuser`, user, { headers });
  }

  getUserData(id: any): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.url}getuser?id=${id}`, { headers });
  }

  deleteUser(id: any) {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}deleteuser?id=${id}`, { headers });
  }

  // ---------------------------------------------------------reservations--------------------------------------------------------------

  sendReservation(user_id: any, fishingplace_id: any, reservationStart: any, reservationEnd: any, guestNumber: any): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const reservationData = {
      fishingplace_id,
      reservationEnd,
      reservationStart,
      user_id,
      guestNumber
    };
    return this.http.post(`${this.url}addreservation`, reservationData, { headers });
  }

  getUserReservations(id: any): Observable<any[]> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.url}getuserreservations?user_id=${id}`, { headers });
  }

  updateUserReservation(id: number, user_id: number, fishingplace_id: number, reservationStart: Date, reservationEnd: Date, guestNumber: number): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const reservation = {
      id,
      user_id,
      fishingplace_id,
      reservationStart,
      reservationEnd,
      guestNumber
    };
    return this.http.put<any>(`${this.url}modifyreservation`, reservation, { headers });
  }

  deleteUserReservation(id: number): Observable<void> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.url}deletereservation?id=${id}`, { headers });
  }

  private getAuthToken(): string | null {
    return sessionStorage.getItem('token');
  }
} 
