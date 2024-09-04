import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string): Observable<boolean> {
    if (email === 'test@test.com' && password === 'testpass'){
      console.log('Login Success');
      return of(true);
    } else{
      console.error('Invalid Login');
      return of(false);
    }
  }

}
