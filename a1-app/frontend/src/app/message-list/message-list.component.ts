import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../channel.service';  // Assuming you have the service

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() channelId!: string;  // Passed from parent component
  messages: any[] = [];  // List of messages to display
  newMessage: string = '';  // Message typed by the user
  sender: string = 'User';  // Example sender, replace with dynamic user if needed

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
      this.messages.push(message);  // Append the new message to the array
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      // Send the message through the service
      this.channelService.sendMessage(this.channelId, this.newMessage, this.sender);
      this.newMessage = '';  // Clear the input field
    }
  }
}
