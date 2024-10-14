import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../app.component.css']  // Fixed styleUrls typo here
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private router: Router) {}

  // Use the ngOnInit lifecycle hook for initialization logic
  ngOnInit(): void {
    // Initialize users in localStorage (if in the browser)
    if (typeof window !== 'undefined' && !localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([
        {
          email: 'superuser@example.com',
          password: 'superpassword',
          role: 'superUser'
        }
      ]));
      console.log('Initialized users in localStorage');
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
