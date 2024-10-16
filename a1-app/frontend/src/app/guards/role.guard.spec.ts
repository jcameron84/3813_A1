import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Role } from '../roles';

describe('RoleGuard', () => {
  let roleGuard: RoleGuard;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getRole']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    roleGuard = TestBed.inject(RoleGuard);
    route = new ActivatedRouteSnapshot();
    state = {} as RouterStateSnapshot;
  });

  it('should allow navigation if the user is logged in with the correct role', () => {
    // Arrange
    route.data = { expectedRole: Role.admin };
    authServiceMock.isLoggedIn.and.returnValue(true);
    authServiceMock.getRole.and.returnValue(Role.admin);

    // Act
    const result = roleGuard.canActivate(route, state);

    // Assert
    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login if the user role does not match', () => {
    // Arrange
    route.data = { expectedRole: Role.superUser };
    authServiceMock.isLoggedIn.and.returnValue(true);
    authServiceMock.getRole.and.returnValue(Role.admin);

    // Act
    const result = roleGuard.canActivate(route, state);

    // Assert
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to login if the user is not logged in', () => {
    // Arrange
    route.data = { expectedRole: Role.admin };
    authServiceMock.isLoggedIn.and.returnValue(false);

    // Act
    const result = roleGuard.canActivate(route, state);

    // Assert
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
