import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatService],
    });
    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve messages from the API via GET', () => {
    const dummyMessages = [
      { user: 'John', message: 'Hello' },
      { user: 'Jane', message: 'Hi' }
    ];
  
    const channelId = '12345';
  
    service.getMessages('12345').subscribe((messages) => {
      expect(messages.length).toBe(2);
      expect(messages).toEqual(dummyMessages);
    });
  
    const req = httpMock.expectOne('http://localhost:5000/api/messages/12345');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMessages);
  });

  it('should handle error when getMessages() fails', () => {
    const errorResponse = new ErrorEvent('Network error');
    
    service.getMessages('12345').subscribe({
      next: () => fail('Expected error'),
      error: (error) => {
        expect(error.message).toContain('Http failure response');
      }
    });
  
    const req = httpMock.expectOne(`http://localhost:5000/api/messages/12345`);
    req.error(errorResponse);
  });
});
