import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  domain = 'http://localhost:8080/';
  // Domain is http://localhost:8080/

  constructor(private http: Http) { }

  authUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.domain}api/user/authenticate`, user, {headers: headers})
      .map(res => res.json());
  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.domain}api/user/register`, user, {headers: headers})
      .map(res => res.json());
  }

  checkEmail(email) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.domain}api/user/checkEmail/${email}`, {headers: headers})
      .map(res => res.json());
  }


  loadToken() {
    const token = localStorage.getItem('auth_token');
    this.authToken = token;
  }

  storeUserData(token, user) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired('auth_token');
  }
}
