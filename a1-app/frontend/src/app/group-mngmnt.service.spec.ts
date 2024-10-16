import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GroupService } from './group-mngmnt.service';
import { Group, Channel } from './manage-groups/model';

describe('GroupService', () => {
  let service: GroupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupService],
    });
    service = TestBed.inject(GroupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should retrieve groups from local storage', () => {
    const mockGroups: Group[] = [
      { _id: '1', name: 'Test Group 1', channels: [] },
      { _id: '2', name: 'Test Group 2', channels: [] }
    ];

    localStorage.setItem('groups', JSON.stringify(mockGroups));

    const groups = service.getGroups();
    expect(groups).toEqual(mockGroups);
  });

  it('should save groups to local storage', () => {
    const mockGroups: Group[] = [
      { _id: '1', name: 'Test Group 1', channels: [] },
    ];

    service.saveGroups(mockGroups);
    const storedGroups = JSON.parse(localStorage.getItem('groups')!);
    expect(storedGroups).toEqual(mockGroups);
  });

  it('should add a group and update local storage', () => {
    const mockGroup: Group = { _id: '3', name: 'New Group', channels: [] };

    service.addGroup('New Group').subscribe((group: any) => {
      expect(group).toEqual(mockGroup);

      const groups = service.getGroups();
      expect(groups.length).toBe(1);
      expect(groups[0].name).toBe('New Group');
    });

    const req = httpMock.expectOne('http://localhost:5000/api/groups');
    expect(req.request.method).toBe('POST');
    req.flush(mockGroup);
  });

  it('should delete a group from local storage', () => {
    const mockGroups: Group[] = [
      { _id: '1', name: 'Test Group 1', channels: [] },
      { _id: '2', name: 'Test Group 2', channels: [] }
    ];

    localStorage.setItem('groups', JSON.stringify(mockGroups));

    service.deleteGroup('1');
    const groupsAfterDelete = service.getGroups();
    expect(groupsAfterDelete.length).toBe(1);
    expect(groupsAfterDelete[0]._id).toBe('2');
  });

  it('should fetch channels for a group', () => {
    const mockChannels: Channel[] = [
      { _id: '1', name: 'Channel 1' },
      { _id: '2', name: 'Channel 2' }
    ];

    service.getChannels('12345').subscribe((channels: any) => {
      expect(channels).toEqual(mockChannels);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/groups/12345/channels');
    expect(req.request.method).toBe('GET');
    req.flush(mockChannels);
  });

  it('should create a channel and update the local storage group', () => {
    const mockGroup: Group = { _id: '12345', name: 'Test Group', channels: [] };
    const mockChannel: Channel = { _id: '1', name: 'New Channel' };

    localStorage.setItem('groups', JSON.stringify([mockGroup]));

    service.createChannel('12345', 'New Channel').subscribe((channel: any) => {
      expect(channel).toEqual(mockChannel);

      const updatedGroups = service.getGroups();
      const group = updatedGroups.find((g: { _id: string; }) => g._id === '12345');
      expect(group!.channels.length).toBe(1);
      expect(group!.channels[0].name).toBe('New Channel');
    });

    const req = httpMock.expectOne('http://localhost:5000/api/groups/12345/channels');
    expect(req.request.method).toBe('POST');
    req.flush(mockChannel);
  });

  it('should delete a channel and update the local storage group', () => {
    const mockGroup: Group = {
      _id: '12345',
      name: 'Test Group',
      channels: [
        { _id: '1', name: 'Channel 1' },
        { _id: '2', name: 'Channel 2' }
      ]
    };

    localStorage.setItem('groups', JSON.stringify([mockGroup]));

    service.deleteChannel('12345', '1').subscribe(() => {
      const updatedGroups = service.getGroups();
      const group = updatedGroups.find((g: { _id: string; }) => g._id === '12345');
      expect(group!.channels.length).toBe(1);
      expect(group!.channels[0]._id).toBe('2');
    });

    const req = httpMock.expectOne('http://localhost:5000/api/groups/12345/channels/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
