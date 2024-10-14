import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role.guard';  // Correct import
import { Router } from '@angular/router';
import { AuthService } from './auth.service';  // Inject dependencies if necessary

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create spies for dependencies
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getRole']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    // Inject the guard using TestBed
    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();  // Check if RoleGuard is created
  });

  // You can add more tests for the guard behavior
});
