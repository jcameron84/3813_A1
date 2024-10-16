import { TestBed } from '@angular/core/testing';

import { ChannelService } from './channel.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ChannelService', () => {
  let service: ChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
