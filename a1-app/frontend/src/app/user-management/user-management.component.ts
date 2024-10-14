import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role } from '../roles';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  email: string = '';
  password: string = '';
  role: Role = Role.user;

  userRoles = Object.values(Role);  // Array of user roles for the dropdown

  successMessage: string = '';  
  errorMessage: string = '';    

  constructor(private authService: AuthService) {}

  createUser() {
    this.authService.createUser(this.email, this.password, this.role)
      .subscribe(user => {
        if (user) {
          this.successMessage = 'User created!';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'User creation failed';
          this.successMessage = '';
        }
      });
  }
}
