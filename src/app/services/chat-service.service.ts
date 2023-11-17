import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  url!: string;
  constructor(
    private http:HttpClient
  ) {
    this.url = environment.base_url
  }
  
  getFullChat(id: string) {
    return this.http.get(`${this.url}/getFullChat/${id}`,
      { withCredentials: true });
  }
  sendMessages(data: object) {
    return this.http.post(`${this.url}/sendMessages`, data, {
      withCredentials: true,
    });
  }

  

  
}
