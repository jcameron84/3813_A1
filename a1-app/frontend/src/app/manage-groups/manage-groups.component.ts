import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group-mngmnt.service';  // Assuming you have a GroupService
import { Observable } from 'rxjs';
import { Group, Channel } from './model';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
  
})
export class ManageGroupsComponent implements OnInit {
  groups: Group[] = [];  // Use the Group[] type
  newGroupName: string = '';
  selectedGroupId: string = '';

  // Channel properties
  newChannelName: string = '';

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    this.groups = this.groupService.getGroups();
  }

  // Create a new group (stored in local storage)
  createGroup(): void {
    if (this.newGroupName) {
      this.groupService.addGroup(this.newGroupName).subscribe(() => {
        this.getGroups();  // Refresh the group list
        this.newGroupName = '';
      });
    }
  }
  

  // Delete a group (from local storage)
  deleteGroup(groupId: string): void {
    this.groupService.deleteGroup(groupId);
    this.getGroups();  // Refresh the group list after deletion
  }

  // Create a channel in MongoDB and link it to the selected local group
  createChannel(): void {
    if (this.selectedGroupId && this.newChannelName) {
      this.groupService.createChannel(this.selectedGroupId, this.newChannelName).subscribe(() => {
        this.getGroups();  // Refresh the group list to include the new channel
        this.newChannelName = '';
      });
    }
  }
  

  // Delete a channel from MongoDB and update the group in local storage
  deleteChannel(groupId: string, channelId: string): void {
    this.groupService.deleteChannel(groupId, channelId).subscribe(() => {
      this.getGroups();  // Refresh the group list after deletion
    });
  }

  // Select a group to add channels to
  selectGroup(groupId: string): void {
    this.selectedGroupId = groupId;
  }
}

