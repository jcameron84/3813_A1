import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:5000');  // Adjust server URL as necessary

  // Emit event to join a channel
  joinChannel(channelId: string, username: string): void {
    this.socket.emit('joinChannel', channelId, username);
  }

  // Listen for the user joined event
  onUserJoined(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('userJoined', (data) => {
        observer.next(data);
      });
    });
  }

  // Listen for the user left event
  onUserLeft(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('userLeft', (data) => {
        observer.next(data);
      });
    });
  }

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
  
  onNewMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message: any) => {
        observer.next(message);  // Emit the message received from the server
      });
    });
  }
  
}
