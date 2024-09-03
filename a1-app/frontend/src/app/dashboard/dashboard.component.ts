import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chatRooms = [
    { id: 1, name: 'General Chat' },
    { id: 2, name: 'Project Discussion' },
    { id: 3, name: 'Random' }
  ];

  constructor(private router: Router) {}

  navigateToRoom(roomId: number) {
    // Navigate to the chat room page (you'll need to set up routing for this)
    this.router.navigate(['dashboard/chat', roomId]);
  }
}