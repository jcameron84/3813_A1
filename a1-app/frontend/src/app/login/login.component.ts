import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  email: string = '';
  password: string = '';
  onSubmit() {
    // Implement your login logic here
    if (this.email && this.password){
      this.authService.login(this.email, this.password).subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          console.log('Login Successful');
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Invalid Input');
        }
      })
    } else {
      console.error('Invalid Form');
    }
  }
}