import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User, getUsers } from '../users';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent implements OnInit {
  users: User[] = [];  // Use the User interface for typing
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();  // Load the list of users when the component is initialized
  }

  // Load all users from localStorage
  loadUsers() {
    this.users = getUsers();  // Use the getUsers function from user.ts
  }

  // Delete a user
  deleteUser(email: string) {
    this.authService.deleteUser(email).subscribe(success => {
      if (success) {
        this.successMessage = 'User deleted successfully!';
        this.loadUsers();  // Reload users after deleting
      } else {
        this.errorMessage = 'Failed to delete the user';
      }
    });
  }
}
