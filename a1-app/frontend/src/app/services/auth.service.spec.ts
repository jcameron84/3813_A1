import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Role } from '../roles';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatService } from './chat.service';
import { GroupService } from '../group-mngmnt.service';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, ChatService, GroupService],
      imports: [HttpClientTestingModule],  
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for a valid login', (done: DoneFn) => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{ email: 'test@test.com', password: '123456', role: Role.user }]);
    });

    service.login('test@test.com', '123456').subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTrue();
      done();  // Mark test as complete
    });
  });

  it('should return false for an invalid login', (done: DoneFn) => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{ email: 'test@test.com', password: '123456', role: Role.user }]);
    });

    service.login('wrong@test.com', 'wrongPassword').subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
      done();  // Mark test as complete
    });
  });
});
