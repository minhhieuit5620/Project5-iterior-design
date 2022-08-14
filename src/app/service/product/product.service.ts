import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Products } from 'src/app/model/products/products.model';

import { FormsModule } from '@angular/forms';
import { Data } from '@angular/router';

// @Injectable()
// export class ServiceNameService {
  
//   constructor(private http: HttpClient) { }

// }

 var baseURL="http://localhost:65426/api/Products/";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL="http://localhost:65426/api/Products/SearchByName";
  constructor( private httpClient:HttpClient ) { }

  getAll(){
    return this.httpClient.get<Products[]>(baseURL);
  }
  // create(data): Observable<any> {
  //   return this.httpClient.post(Products, data);
  // }
  get(id:Number): Observable<any> {
    return this.httpClient.get<Products[]>(baseURL+id);
  }
  AddPr(data:Products):Observable<Products> {
    return this.httpClient.post<Products>(baseURL,data);
  }
  deletePr(id: number): Observable<unknown> {
  
    return this.httpClient.delete(baseURL+id);
   
      
  }
  updatePr(data: Products): Observable<Products> {
    return this.httpClient.put<Products>(baseURL, data);
      // .pipe(
      //   catchError(this.handleError('updateHero', hero))
      // );
  }
  Search(searchString:string):Observable<Products[]>{
    if(!searchString.trim()){
      return of([]);
    }
    // const url=`${this.URL}${name}`;
    // console.log(url);
    debugger;
    return this.httpClient.get<Products[]>(`${this.URL}/${searchString}`);
  }
  // searchMovies(typedString: string): Observable<Products[]> {
  //   if (!typedString.trim()) {     
  //     return of([]);
  //   }
  //   return this.httpClient.get<Products[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
  //     tap(foundedMovies => console.log(`founded movies = ${JSON.stringify(foundedMovies)}`)),
  //     catchError(error => of(null))
  //   );
  // }
  // AddPr():void{
  //   this.httpClient.post<Products[]>(baseURL);

  // }
  // addSV(): void {
  //   this.httpClient.post(baseUrl, this.sinhvien).subscribe(
  //     data => {
  //       this.addSuccess();
  //       this.refreshList();
  //     }, error => {
  //       this.addError();
  //       console.log("Error", error);
  //     })
  // }

  // getOneSV(id: number): void {
  //   this.httpClient.get<Sinhvien>(baseUrl + '/' + id).subscribe(
  //     data => {
  //       this.sinhvien = data;
  //     }, error => {
  //       console.log("Error", error);
  //     });
  // }

  // putSV(id: number): void {
  //   this.httpClient.put(baseUrl + '/' + id, this.sinhvien).subscribe(
  //     data => {
  //       this.editSuccess();
  //       this.refreshList();
  //     }, error => {
  //       this.editError();
  //       console.log("Error", error);
  //     })
  // }

  // deleteSV(id: number): void {
  //   this.httpClient.delete(baseUrl + '/' + id).subscribe(
  //     data => {
  //       this.deleteSuccess();
  //       this.refreshList();
  //     }, error => {
  //       this.deleteError();
  //       console.log("Error", error);
  //     })
  // }

}
