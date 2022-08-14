import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Orders } from 'src/app/model/order/orders.model';

var baseURL="http://localhost:65426/api/Orders/";
@Injectable({
  providedIn: 'root'
})


export class OrderService {
  private URL="http://localhost:65426/api/Products/SearchByName";
  constructor( private httpClient:HttpClient ) { }

  getAll(){
    return this.httpClient.get<Orders[]>(baseURL);
  }
  // create(data): Observable<any> {
  //   return this.httpClient.post(Products, data);
  // }
  get(id:Number): Observable<any> {
    return this.httpClient.get<Orders[]>(baseURL+id);
  }
  AddPr(data:Orders):Observable<Orders> {
    return this.httpClient.post<Orders>(baseURL,data);
  }
  deletePr(id: number): Observable<unknown> {
    return this.httpClient.delete(baseURL+id);     
  }
  updatePr(data: Orders): Observable<Orders> {
    return this.httpClient.put<Orders>(baseURL, data);

  }
  Search(searchString:string):Observable<Orders[]>{
    if(!searchString.trim()){
      return of([]);
    }

    debugger;
    return this.httpClient.get<Orders[]>(`${this.URL}/${searchString}`);
  }
}
