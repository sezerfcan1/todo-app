import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

const baseUrl = 'http://localhost:5000/api/todo';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor(private http: HttpClient) {}

  getHttpOption(){
    const token = localStorage.getItem('access_token');
    console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
    };
    return httpOptions
  }


  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add-Todo` ,data,this.getHttpOption());
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${baseUrl}`,this.getHttpOption());
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`,this.getHttpOption());
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data, this.getHttpOption());
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`,this.getHttpOption());
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl,this.getHttpOption());
  }

  findByTitle(title: any): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${baseUrl}?title=${title}`,this.getHttpOption());
  }
}