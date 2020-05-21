import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private loginUrl = 'http://localhost:3000/api/login';
private registerUrl = 'http://localhost:3000/api/register';
private _currentUserUrl = 'http://localhost:3000/api/user';
  private _addUserUrl = 'http://localhost:3000/api/user';
  private changePasswordUrl = 'http://localhost:3000/api/user/reset-password/';
  constructor(private http: HttpClient, private router: Router) { }
  logIn(user) {
    return this.http.post<any>(this.loginUrl, user);
  }
  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin-login']);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getLoggedInUser() {
    return this.http.get<any>(this._currentUserUrl);
  }
  changePassword(id, claimant) {
    return this.http.put<any>(this.changePasswordUrl + id, claimant);
  }
}
