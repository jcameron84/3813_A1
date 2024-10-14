import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private apiUrl = 'http://localhost:5000/api';  // Backend REST API URL
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:5000');  // Connect to Socket.IO server
  }

  // Get all channels from the backend
  getChannels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/channels`);
  }

  // Get all messages for a specific channel
  getMessages(channelId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/${channelId}`);
  }

  // Join a specific channel (Socket.IO room)
  joinChannel(channelId: string): void {
    this.socket.emit('joinChannel', channelId);
  }

  // Send a message to a specific channel
  sendMessage(channelId: string, content: string, sender: string): void {
    this.socket.emit('sendMessage', { channelId, content, sender });
  }

  // Listen for new messages in a channel
  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }
}
