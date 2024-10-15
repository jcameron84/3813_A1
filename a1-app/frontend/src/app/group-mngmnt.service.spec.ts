import { TestBed } from '@angular/core/testing';

import { GroupMngmntService } from './group-mngmnt.service';

describe('GroupMngmntService', () => {
  let service: GroupMngmntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupMngmntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
