import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from './roles';
import { HttpClient } from '@angular/common/http';

interface User {
  email: string;
  password: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private userRole: Role | null = null; 

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    const usersFromStorage = localStorage.getItem('users');
    const users: User[] = usersFromStorage ? JSON.parse(usersFromStorage) : [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      this.loggedIn = true;
      this.userRole = user.role;  // Assign the user's role
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store session
      return of(true);
    } else {
      console.error('Invalid Login');
      return of(false);
    }
  }


  createUser(email: string, password: string, role: Role): Observable<any> {
    const usersFromStorage = localStorage.getItem('users');
    const users: User[] = usersFromStorage ? JSON.parse(usersFromStorage) : [];
    const newUser: User = { email, password, role };
    
    if (users.some(user => user.email === email)) {
      console.error('User already exists');
      return of(null);
    }
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return of(newUser);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    this.userRole = null;
    localStorage.removeItem('loggedInUser');
  }
  hasRole(requiredRole: Role): boolean {
    return this.userRole === requiredRole;
  }

  getRole(): Role | null {
    return this.userRole;
  }

}
