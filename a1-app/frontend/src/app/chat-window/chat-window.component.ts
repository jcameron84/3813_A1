import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../channel.service';  // Import your service

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  @Input() channelId!: string;  // Channel ID passed from parent component
  messages: any[] = [];  // Array to store messages
  newMessage: string = '';  // Input message
  sender: string = 'User';  // Hardcoded sender, replace with dynamic user if needed

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    // Join the channel using Socket.IO
    this.channelService.joinChannel(this.channelId);

    // Fetch existing messages from the backend
    this.channelService.getMessages(this.channelId).subscribe((messages) => {
      this.messages = messages;
    });

    // Listen for new messages in real-time
    this.channelService.onNewMessage().subscribe((message) => {
      this.messages.push(message);  // Add the new message to the message array
    });
  }

  // Send the new message
  sendMessage(): void {
    if (this.newMessage.trim()) {
      // Use the ChannelService to send the message
      this.channelService.sendMessage(this.channelId, this.newMessage, this.sender);
      this.newMessage = '';  // Clear the input field after sending
    }
  }
}
