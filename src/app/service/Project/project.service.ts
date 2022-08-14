import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from 'src/app/model/projects/projects.model';

import { FormsModule } from '@angular/forms';
import { Data } from '@angular/router';

 var baseURL="http://localhost:65426/api/Projects/";
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private URL="http://localhost:65426/api/Products/SearchByName";
  constructor( private httpClient:HttpClient ) { }

  getAll(){
    return this.httpClient.get<Project[]>(baseURL);
  } 
  get(id:Number): Observable<any> {
    return this.httpClient.get<Project[]>(baseURL+id);
  }
  AddPr(data:Project):Observable<Project> {
    return this.httpClient.post<Project>(baseURL,data);
  }
  deletePr(id: number): Observable<unknown> {
  
    return this.httpClient.delete(baseURL+id);
  }
  updatePr(data: Project): Observable<Project> {
    return this.httpClient.put<Project>(baseURL, data);    
  }
  Search(searchString:string):Observable<Project[]>{
    if(!searchString.trim()){
      return of([]);
    }
   
    debugger;
    return this.httpClient.get<Project[]>(`${this.URL}/${searchString}`);
  }
}
