import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Products } from 'src/app/model/products/products.model';

import { FormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { cateProject } from 'src/app/model/projects/cateProjectmodel';

// @Injectable()
// export class ServiceNameService {
  
//   constructor(private http: HttpClient) { }

// }

 var baseURL="http://localhost:65426/api/CategoryProjects/";
@Injectable({
  providedIn: 'root'
})
export class cateProjectService {

  private URL="http://localhost:65426/api/Products/SearchByName";
  constructor( private httpClient:HttpClient ) { }

  getAll(){
    return this.httpClient.get<cateProject[]>(baseURL);
  }
  // create(data): Observable<any> {
  //   return this.httpClient.post(Products, data);
  // }
  get(id:Number): Observable<any> {
    return this.httpClient.get<cateProject[]>(baseURL+id);
  }
  AddPr(data:cateProject):Observable<cateProject> {
    return this.httpClient.post<cateProject>(baseURL,data);
  }
  deletePr(id: number): Observable<unknown> {
  
    return this.httpClient.delete(baseURL+id);
   
      
  }
  updatePr(data: cateProject): Observable<cateProject> {
    return this.httpClient.put<cateProject>(baseURL, data);
      // .pipe(
      //   catchError(this.handleError('updateHero', hero))
      // );
  }
  Search(searchString:string):Observable<cateProject[]>{
    if(!searchString.trim()){
      return of([]);
    }
    // const url=`${this.URL}${name}`;
    // console.log(url);
    debugger;
    return this.httpClient.get<cateProject[]>(`${this.URL}/${searchString}`);
  }
}
