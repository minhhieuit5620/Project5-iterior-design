import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { FormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { LienHes } from 'src/app/model/contact/contact.model';

// @Injectable()
// export class ServiceNameService {
  
//   constructor(private http: HttpClient) { }

// }

 var baseURL="http://localhost:65426/api/LienHes/";
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private URL="http://localhost:65426/api/Products/SearchByName";
  constructor( private httpClient:HttpClient ) { }

  getAll(){
    return this.httpClient.get<LienHes[]>(baseURL);
  }
  // create(data): Observable<any> {
  //   return this.httpClient.post(Products, data);
  // }
  get(id:Number): Observable<any> {
    return this.httpClient.get<LienHes[]>(baseURL+id);
  }
  AddPr(data:LienHes):Observable<LienHes> {
    return this.httpClient.post<LienHes>(baseURL,data);
  }
  deletePr(id: number): Observable<unknown> {
  
    return this.httpClient.delete(baseURL+id);
   
      
  }
  updatePr(data: LienHes): Observable<LienHes> {
    return this.httpClient.put<LienHes>(baseURL, data);
      // .pipe(
      //   catchError(this.handleError('updateHero', hero))
      // );
  }
  Search(searchString:string):Observable<LienHes[]>{
    if(!searchString.trim()){
      return of([]);
    }
    // const url=`${this.URL}${name}`;
    // console.log(url);
    debugger;
    return this.httpClient.get<LienHes[]>(`${this.URL}/${searchString}`);
  }
  
}
