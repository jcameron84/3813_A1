import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of(true)),
      getRole: jasmine.createSpy('getRole').and.returnValue('superUser')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate') // Ensure navigate is mocked correctly
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule], // Import FormsModule
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should log in successfully and navigate to dashboard for superUser', () => {
    component.email = 'test@example.com';
    component.password = 'password123';

    component.login(); // Call the login method

    expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(authServiceMock.getRole).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
