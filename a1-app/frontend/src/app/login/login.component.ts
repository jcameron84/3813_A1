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


  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(email: string, password: string) {
    this.authService.login(this.email, this.password).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const role = this.authService.getRole();

        if (role === 'superUser') {
          this.router.navigate(['/dashboard'])
        } else if (role === 'admin') {
          this.router.navigate(['/dashboard'])
        } else {
          this.router.navigate(['/dashboard'])
        }

      }else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}