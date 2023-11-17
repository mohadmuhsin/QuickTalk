import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  url:string
  constructor(private http:HttpClient) { 
    this.url = environment.base_url;
  }

  signup(data: any) {
    console.log(data);
    
    return this.http.post(`${this.url}/register`, data, { withCredentials: true });
  }

  login(data: any) {
    return this.http.post(`${this.url}/login`, data, { withCredentials: true });
  }

  allUser() {
    return this.http.get(`${this.url}/allUser`, { withCredentials: true });
  }

  getUser(id: string) {
    return this.http.get(`${this.url}/getUser/${id}`,{withCredentials:true})
  }

  logout() {
    return this.http.post(`${this.url}/logout`,"",{withCredentials:true})
  }


}
