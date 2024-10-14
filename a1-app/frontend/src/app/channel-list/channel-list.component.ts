import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../channel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {
  channels: any[] = [];

  constructor(private channelService: ChannelService, private router: Router) {}

  ngOnInit(): void {
    this.channelService.getChannels().subscribe((channels) => {
      this.channels = channels;
    });
  }

  // Navigate to a specific channel when a channel is clicked
  enterChannel(channelId: string): void {
    this.router.navigate([`/channel/${channelId}`]);
  }
}
