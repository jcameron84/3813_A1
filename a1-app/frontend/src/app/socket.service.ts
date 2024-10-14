import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private serverUrl = 'http://localhost:5000';  // Adjust if your backend is hosted elsewhere

  constructor() {
    this.socket = io(this.serverUrl);
  }

  // Join a channel
  joinChannel(channelId: string): void {
    this.socket.emit('joinChannel', channelId);
  }

  // Send a message
  sendMessage(channelId: string, content: string, sender: string): void {
    this.socket.emit('sendMessage', { channelId, content, sender });
  }

  // Listen for new messages
  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }
}
