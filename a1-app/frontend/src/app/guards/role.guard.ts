import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../roles';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['expectedRole'] as Role;
    const currentUserRole = this.authService.getRole();  // Get current role from AuthService

    if (this.authService.isLoggedIn() && currentUserRole === expectedRole) {
      return true;  // Allow access if logged in and role matches
    } else {
      this.router.navigate(['/login']);  // Redirect to login if role doesn't match
      return false;
    }
  }
}
