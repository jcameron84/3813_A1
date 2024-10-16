import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageGroupsComponent } from './manage-groups.component';
import { GroupService } from '../group-mngmnt.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Group } from './model';

describe('ManageGroupsComponent', () => {
  let component: ManageGroupsComponent;
  let fixture: ComponentFixture<ManageGroupsComponent>;
  let groupServiceMock: any;

  const mockGroups: Group[] = [
    { _id: '1', name: 'Group 1', channels: [] },
    { _id: '2', name: 'Group 2', channels: [] }
  ];

  beforeEach(async () => {
    groupServiceMock = {
      getGroups: jasmine.createSpy('getGroups').and.returnValue(mockGroups),
      addGroup: jasmine.createSpy('addGroup').and.returnValue(of({ _id: '3', name: 'New Group', channels: [] })),
      deleteGroup: jasmine.createSpy('deleteGroup').and.callFake(() => {}),
      createChannel: jasmine.createSpy('createChannel').and.returnValue(of({ _id: '101', name: 'New Channel' })),
      deleteChannel: jasmine.createSpy('deleteChannel').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [ManageGroupsComponent],
      imports: [FormsModule], // Import FormsModule for form elements like ngModel
      providers: [{ provide: GroupService, useValue: groupServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load groups on initialization', () => {
    component.ngOnInit();
    expect(groupServiceMock.getGroups).toHaveBeenCalled();
    expect(component.groups.length).toBe(2);
  });

  it('should create a new group', () => {
    component.newGroupName = 'Test Group';
    component.createGroup();
    expect(groupServiceMock.addGroup).toHaveBeenCalledWith('Test Group');
    expect(component.newGroupName).toBe('');
  });

  it('should delete a group', () => {
    component.deleteGroup('1');
    expect(groupServiceMock.deleteGroup).toHaveBeenCalledWith('1');
  });

  it('should create a new channel', () => {
    component.selectedGroupId = '1';
    component.newChannelName = 'Test Channel';
    component.createChannel();
    expect(groupServiceMock.createChannel).toHaveBeenCalledWith('1', 'Test Channel');
    expect(component.newChannelName).toBe('');
  });

  it('should delete a channel', () => {
    component.deleteChannel('1', '101');
    expect(groupServiceMock.deleteChannel).toHaveBeenCalledWith('1', '101');
  });

  it('should select a group', () => {
    component.selectGroup('1');
    expect(component.selectedGroupId).toBe('1');
  });
});
