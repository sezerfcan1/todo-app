import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginForm } from 'src/app/models/auth/loginform.model';
import { Auth } from 'src/app/models/auth/auth.model';
import { RegisterForm } from 'src/app/models/auth/registerform.model';


const baseUrl = "http://localhost:5000/api/auth";

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private http: HttpClient) { }



  login(loginForm:LoginForm) : Observable<Auth>{
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    }
    

    const auth =  this.http.post<Auth>(`${baseUrl}/login`,loginForm,httpOptions)
    
    return auth;

  }

  register(registerForm:RegisterForm) : Observable<Auth>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }

    const auth =  this.http.post<Auth>(`${baseUrl}/register`,registerForm,httpOptions)
    
    return auth;

  }






}
