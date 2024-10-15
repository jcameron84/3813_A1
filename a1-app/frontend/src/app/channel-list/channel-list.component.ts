import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent {
  @Input() channels: any[] = [];  // Pass the list of channels from the parent component

  constructor(private router: Router) {}

  // Navigate to the selected channel's chat window
  enterChannel(channelId: string): void {
    this.router.navigate(['/chat', channelId]);
  }
}
