import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  channelId: string | null = null;  
  messages: any[] = [];
  newMessage: string = '';

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
      if (this.channelId) {
        this.loadMessages(this.channelId);
      }
    });
  }
  

  loadMessages(channelId: string): void {
    this.chatService.getMessages(channelId).subscribe((messages) => {
      this.messages = messages;
    }, error => {
      console.error('Error loading messages:', error);  // Error handling
    });
  }

  // Send a new message to the channel
  sendMessage(): void {
    if (this.newMessage.trim() === '') {
      return;
    }
  
    const message = {
      content: this.newMessage,
      channelId: this.channelId,
      sender: 'User',
      createdAt: new Date()
    };
  
    this.chatService.sendMessage(message).subscribe(() => {
      this.messages.push(message);  // Update the UI with the new message
      this.newMessage = '';  // Clear the input
    }, error => {
      console.error('Error sending message:', error);  // Log the error
    });
  }
  
}
