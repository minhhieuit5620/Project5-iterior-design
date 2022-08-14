import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject, Observable } from 'rxjs';
import { Users } from 'src/app/model/users/users.model';
const AUTH_API = 'http://localhost:65426/api/Token';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private userSubject: BehaviorSubject<Users>;
  // public user: Observable<Users>;
  constructor(private http: HttpClient) { 
    // this.userSubject = new BehaviorSubject<Users>(JSON.parse(sessionStorage.getItem('auth-user')||'{}'));
    // this.user = this.userSubject.asObservable();
  }
  // public get userValue(): Users {
  //   return this.userSubject.value;
   
  // }
  login(username: string, password: string): Observable<any> {
    
      //   const body = new HttpParams()
      //   .set('UserName', username)
      //   .set('Password', password)
      //   .set('grant_type', 'password');


      // return this.http.post(AUTH_API+"?UserName="+username+"&Password="+password ,
      //   body.toString(),
      //   {
      //     headers: new HttpHeaders()
      //       .set('Content-Type', 'application/x-www-form-urlencoded')
      //   }
      // );
    return this.http.post(AUTH_API + '/Login', { username, password });
  }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API, {
  //     username,
  //     email,
  //     password
  //   }, httpOptions);
  // }
}
