import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { FormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { News } from 'src/app/model/news/news.model';



 var baseURL="http://localhost:65426/api/News/";
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private URL="http://localhost:65426/api/Products/SearchByName";
  constructor( private httpClient:HttpClient ) { }

  getAll(){
    return this.httpClient.get<News[]>(baseURL);
  }
  // create(data): Observable<any> {
  //   return this.httpClient.post(Products, data);
  // }
  get(id:Number): Observable<any> {
    return this.httpClient.get<News[]>(baseURL+id);
  }
  AddPr(data:News):Observable<News> {
    return this.httpClient.post<News>(baseURL,data);
  }
  deletePr(id: number): Observable<unknown> {
    return this.httpClient.delete(baseURL+id);     
  }
  updatePr(data: News): Observable<News> {
    return this.httpClient.put<News>(baseURL, data);

  }
  Search(searchString:string):Observable<News[]>{
    if(!searchString.trim()){
      return of([]);
    }

    debugger;
    return this.httpClient.get<News[]>(`${this.URL}/${searchString}`);
  }

}
