import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from './roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private userRole: Role = Role.user;

  constructor() { }

  login(email: string, password: string): Observable<boolean> {
    if (email === 'test@test.com' && password === 'testpass'){
      this.loggedIn = true;
      console.log('Login Success');
      return of(true);
    } else{
      console.error('Invalid Login');
      return of(false);
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
  }

}
