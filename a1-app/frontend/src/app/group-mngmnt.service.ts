import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Group, Channel } from './manage-groups/model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private storageKey = 'groups';  // Local storage key
  private apiUrl = 'http://localhost:5000/api';  // MongoDB API base URL

  constructor(private http: HttpClient) {}

  // Fetch groups from local storage
  getGroups(): Group[] {
    const groups = localStorage.getItem(this.storageKey);
    return groups ? JSON.parse(groups) as Group[] : [];
  }

  saveGroups(groups: Group[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(groups));
  }

  getChannels(groupId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/groups/${groupId}/channels`);
  }

  // Add a new group to local storage
  addGroup(name: string): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/groups`, { name }).pipe(
      tap((newGroup) => {
        // Add the new group with its MongoDB _id to local storage
        const groups = this.getGroups();
        groups.push(newGroup);  // The MongoDB _id will now be used for the group
        this.saveGroups(groups);
      })
    );
  }
  
  // Delete a group from local storage
  deleteGroup(groupId: string): void {
    let groups = this.getGroups();
    groups = groups.filter(group => group._id !== groupId);
    this.saveGroups(groups);
  }

  // Create a channel in MongoDB and update the local storage group with the new channel
  createChannel(groupId: string, name: string): Observable<Channel> {
    return this.http.post<Channel>(`${this.apiUrl}/groups/${groupId}/channels`, { name }).pipe(
      tap((newChannel) => {
        // Add the new channel to the local storage group
        const groups = this.getGroups();
        const group = groups.find(g => g._id === groupId);
        if (group) {
          group.channels.push(newChannel);
          this.saveGroups(groups);  // Save the updated groups back to local storage
        }
      })
    );
  }
  

  // Delete a channel from MongoDB and update the local storage group
  deleteChannel(groupId: string, channelId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/groups/${groupId}/channels/${channelId}`).pipe(
      tap(() => {
        const groups = this.getGroups();
        const group = groups.find(g => String(g._id) === String(groupId));
        if (group) {
          group.channels = group.channels.filter(channel => String(channel._id) !== String(channelId));
          this.saveGroups(groups);  // Save updated group back to local storage
        }
      })
    );
  }

  // Utility function to generate a unique group ID for local storage
  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}


