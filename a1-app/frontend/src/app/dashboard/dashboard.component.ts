import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../roles';
import { Group, Channel } from '../manage-groups/model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  groups: Group[] = [];  // Groups loaded from local storage
  channels: Channel[] = [];  // Channels for the selected group
  selectedGroupId: string | null = null;
  selectedChannelId: string | null = null;

  constructor(private router: Router, private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    //this.populateDummyGroups();
    this.loadGroupsFromStorage();
  }

  loadGroupsFromStorage(): void {
    const storedGroups = localStorage.getItem('groups');
    console.log('Stored groups in localStorage:', storedGroups);  // Debugging log
    this.groups = storedGroups ? JSON.parse(storedGroups) : [];
    console.log('Parsed groups:', this.groups);  // Debugging log
  }


  navigateToRoom(roomId: number) {
    this.router.navigate(['dashboard/chat', roomId]);
  }

  isSuperUser(): boolean {
    return this.authService.getRole() === Role.superUser;
  }

  isAdmin(): boolean {
    return this.authService.getRole() === Role.admin;
  }

  goToCreateUser() {
    this.router.navigate(['/createUser']);
  }
  goToManageGroups() {
    this.router.navigate(['/manageGroups']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  goToDeleteUsers() {
    this.router.navigate(['/deleteUsers']);
  }

  // Select a group and show its channels
selectGroup(groupId: string): void {
  this.selectedGroupId = groupId;
  const selectedGroup = this.groups.find(group => group._id === groupId);
  if (selectedGroup) {
    this.channels = selectedGroup.channels;  // Load the channels for the selected group
  }
}

// Navigate to a channel's chat window
selectChannel(channelId: string): void {
  this.selectedChannelId = channelId;
  this.router.navigate(['dashboard/chat', channelId]);  // Assuming you have a route set up for the chat window
}

  populateDummyGroups(): void {
    const exampleGroups = [
      {
        _id: 'group1',
        name: 'General Group',
        channels: [
          { _id: 'channel1', name: 'General Discussion' },
          { _id: 'channel2', name: 'Tech Talk' }
        ]
      },
      {
        _id: 'group2',
        name: 'Project Group',
        channels: [
          { _id: 'channel3', name: 'Project Discussion' }
        ]
      }
    ];
    localStorage.setItem('groups', JSON.stringify(exampleGroups));
    console.log('Dummy groups populated');
  }
  
  

}