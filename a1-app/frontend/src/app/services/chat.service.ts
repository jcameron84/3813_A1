import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:5000/api';  // Your backend API

  constructor(private http: HttpClient) {}

  // Get messages for a channel
  getMessages(channelId: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/messages/${channelId}`);
  }

  // Send a message to a channel
  sendMessage(message: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/messages', message);
  }
  
}
