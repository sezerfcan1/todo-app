import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/auth/userdetails.model';
const baseUrl = 'http://localhost:5000/api';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getHttpOption(){
    const token = localStorage.getItem('access_token');
    console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({ 'authorization': `Bearer ${token}` })
    };
    return httpOptions
  }

  constructor(private http: HttpClient) { }

  getProfileDetails(): Observable<any>{
    
    const userDetails =  this.http.get<any>(`${baseUrl}/users`, this.getHttpOption())
    return userDetails;
  }


  changeImage(file: File) : Observable<any>{
    const formData: FormData = new FormData();
    formData.append('profile_image', file);
    const info = this.http.post<any>(`${baseUrl}/auth/upload`,formData ,this.getHttpOption())

    return info

  }

  updateDetails(userDetails:UserDetails){
    const info = this.http.put(`${baseUrl}/auth/edit`,userDetails,this.getHttpOption())
    console.log(info)
    return info
  }

}
