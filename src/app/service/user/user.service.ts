import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/users/users.model';

var BaseURL="http://localhost:65426/api/Users/";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Users[]>{
    return this.http.get<Users[]>(BaseURL);  
  }
  // AddPr(data:Users):Observable<Users> {
  //   return this.http.post<Users>(BaseURL,data);
  // }
  addUser(data:Users):Observable<Users>{
    return this.http.post<Users>(BaseURL,data) 
  }
  // AddPr(data:Products):Observable<Products> {
  //   return this.httpClient.post<Products>(baseURL,data);
  // }
  get(id:Number): Observable<any> {
    return this.http.get<Users[]>(BaseURL+id);
  }
  updatePr(data: Users): Observable<Users> {
    return this.http.put<Users>(BaseURL, data);
      // .pipe(
      //   catchError(this.handleError('updateHero', hero))
      // );
  }
  deleteUser(id: number): Observable<unknown> {
  
    return this.http.delete(BaseURL+id);
   
      
  }
  // deletePr(id: number): Observable<unknown> {
  
  //   return this.httpClient.delete(baseURL+id);
   
      
  // }
}
