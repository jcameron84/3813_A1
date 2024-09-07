import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Role } from '../roles';
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

  constructor(private authService: AuthService, private router: Router) {}

  navigateToRoom(roomId: number) {
    // Navigate to the chat room page (you'll need to set up routing for this)
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
  

}