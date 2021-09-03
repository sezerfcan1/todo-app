import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const baseUrl = "http://localhost:5000/api/auth/activation?activationToken=";

@Injectable({
  providedIn: 'root'
})


export class ActivationService {

  constructor(private http: HttpClient) { }


  activation(activationToken:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }

    const active = this.http.put<any>(`${baseUrl+activationToken}`,httpOptions);

    return active;

  }


}
