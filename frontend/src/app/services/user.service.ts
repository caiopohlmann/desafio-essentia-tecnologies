import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
import { LoginUser } from '../interfaces/Login-user';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:3500/api';

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  signUp(user: User) {
    return this.http.post<any>(`${this.URL}/signup`, user);
  }

  login(user: LoginUser) {
    return this.http.post<LoginResponse>(`${this.URL}/login`, user);
  }

  getIdentity() {
    const identity = localStorage.getItem('user');
    if (identity && identity !== 'undefined') {
      try {
        const user = JSON.parse(identity);
        console.log('Identity from localStorage:', user);
        return user;
      } catch (error) {
        console.error('Error parsing user identity:', error);
        return null;
      }
    }
    return null;
  }  

  private getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    return token;
  }  

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('listId');
    this.router.navigate(['/entrar']);
  }
}
