import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private URL = 'http://localhost:3500/api';
  private listId: number | null = null;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  addList(title: string, userId: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.post<any>(`${this.URL}/add-list`, { title, user_id: userId }, { headers });
  }

  getLists(userId: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get<any>(`${this.URL}/get-list/${userId}`, { headers });
  }

  addTask(task: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.post<any>(`${this.URL}/add-task`, task, { headers });
  }

  getListId(): number | null {
    const listId = JSON.parse(localStorage.getItem('listId') as string);
    if (listId !== undefined && listId !== null) {
      this.listId = listId;
    } else {
      this.listId = null;
    }
    return this.listId;
  }

  deleteList(id: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.delete<any>(`${this.URL}/delete-list/${id}`, { headers });
  }

  deleteTask(id: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.delete<any>(`${this.URL}/delete-task/${id}`, { headers });
  }
}
