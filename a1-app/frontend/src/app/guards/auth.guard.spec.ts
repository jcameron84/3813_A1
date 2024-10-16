import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should allow navigation if the user is logged in', () => {
    // Arrange: Simulate user logged in
    authServiceMock.isLoggedIn.and.returnValue(true);

    // Act: Call canActivate
    const result = authGuard.canActivate();

    // Assert: Expect navigation to be allowed
    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login if the user is not logged in', () => {
    // Arrange: Simulate user not logged in
    authServiceMock.isLoggedIn.and.returnValue(false);

    // Act: Call canActivate
    const result = authGuard.canActivate();

    // Assert: Expect navigation to be blocked and user redirected to login
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
