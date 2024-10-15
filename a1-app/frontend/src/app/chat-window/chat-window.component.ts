import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit {
  channelId: string | null = null;
  messages: any[] = [];
  newMessage: string = '';

constructor(
  private route: ActivatedRoute,
  private chatService: ChatService,
  private authService: AuthService  // Injecting AuthService properly
) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
  this.channelId = params['id'];
  if (this.channelId) {
      this.loadMessages(this.channelId);

      const username = this.authService.getEmail();  // Fetch the logged-in user's email

      // Join the channel with username
      this.chatService.joinChannel(this.channelId, username);

      // Listen for other users joining the channel
      this.chatService.onUserJoined().subscribe((data) => {
        this.messages.push({ sender: 'System', content: data.message });
      });

      // Listen for users leaving the channel
      this.chatService.onUserLeft().subscribe((data) => {
        this.messages.push({ sender: 'System', content: data.message });
      });

      // Listen for new messages from server
      this.chatService.onNewMessage().subscribe((message) => {
        this.messages.push(message);  // Push new messages into the messages array
        console.log('New message received:', message);  // Debugging log
      });

    }
  });
}

  loadMessages(channelId: string): void {
    this.chatService.getMessages(channelId).subscribe(
      (messages) => {
        this.messages = messages;
      },
      (error) => {
        console.error('Error loading messages:', error); // Error handling
      }
    );
  }
  

  // Send a new message to the channel
  sendMessage(): void {
    if (this.newMessage.trim() === '') {
      return;
    }


    

    const userEmail = this.authService.getEmail();  // Fetch user email from AuthService

    const message = {
      content: this.newMessage,
      channelId: this.channelId,
      sender: userEmail,  // Use the actual user's email
      createdAt: new Date(),
    };

    this.chatService.sendMessage(message).subscribe(
      () => {
        this.messages.push(message); // Update the UI with the new message
        this.newMessage = ''; // Clear the input
      },
      (error) => {
        console.error('Error sending message:', error); // Log the error
      }
    );
  }
}
