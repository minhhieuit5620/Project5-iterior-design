import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Introduce } from 'src/app/model/introduce/introduce.model';


@Injectable({
  providedIn: 'root'
})
export class IntroduceService {

  baseUrl = 'http://localhost:65426/api/introduces/';
  constructor(private http: HttpClient) { }

  getIntro():Observable<Introduce[]>{
    return this.http.get<Introduce[]>(this.baseUrl);
  }
  get(id:Number): Observable<any> {
    return this.http.get<Introduce[]>(this.baseUrl+id);
  }
  AddPr(data:Introduce): Observable<Introduce> {
    return this.http.post<Introduce>(this.baseUrl,data);
  }
  deletePr(id: number): Observable<unknown> {
  
    return this.http.delete(this.baseUrl+id);
   
      
  }
  updatePr(data: Introduce): Observable<Introduce> {
    return this.http.put<Introduce>(this.baseUrl, data);
      // .pipe(
      //   catchError(this.handleError('updateHero', hero))
      // );
  }

}
