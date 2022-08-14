import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:65426/api/Token/Login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
        const body = new HttpParams()
        .set('username', username)
        .set('password', password)
        .set('grant_type', 'password');
      return this.http.post(AUTH_API+"?UserName="+username+"&Password="+password ,
        body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, {
      username,
      email,
      password
    }, httpOptions);
  }
}
