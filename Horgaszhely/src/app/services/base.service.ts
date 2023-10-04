import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private url ="http://localhost:3000/"
  constructor(private http:HttpClient) { }
  getData(target:string){
    return this.http.get(this.url+target)
  }
}
