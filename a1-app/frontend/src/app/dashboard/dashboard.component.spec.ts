import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { Role } from '../roles';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockChatService: jasmine.SpyObj<ChatService>;
  let routerSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getRole', 'logout']);
    mockChatService = jasmine.createSpyObj('ChatService', ['']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ChatService, useValue: mockChatService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load groups from localStorage on initialization', () => {
    const exampleGroups = [
      { _id: 'group1', name: 'Test Group', channels: [] },
    ];
    localStorage.setItem('groups', JSON.stringify(exampleGroups));

    component.loadGroupsFromStorage();

    expect(component.groups.length).toBe(1);
    expect(component.groups[0].name).toBe('Test Group');
  });

  it('should navigate to room when navigateToRoom is called', () => {
    component.navigateToRoom(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard/chat', 1]);
  });

  it('should identify superUser role correctly', () => {
    mockAuthService.getRole.and.returnValue(Role.superUser);
    expect(component.isSuperUser()).toBeTrue();
  });

  it('should identify admin role correctly', () => {
    mockAuthService.getRole.and.returnValue(Role.admin);
    expect(component.isAdmin()).toBeTrue();
  });

  it('should navigate to create user page', () => {
    component.goToCreateUser();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/createUser']);
  });

  it('should navigate to manage groups page', () => {
    component.goToManageGroups();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/manageGroups']);
  });

  it('should log out and navigate to login page', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to delete users page', () => {
    component.goToDeleteUsers();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/deleteUsers']);
  });

  it('should select a group and load its channels', () => {
    const exampleGroups = [
      { _id: 'group1', name: 'Group 1', channels: [{ _id: 'channel1', name: 'Channel 1' }] },
    ];
    localStorage.setItem('groups', JSON.stringify(exampleGroups));

    component.loadGroupsFromStorage();
    component.selectGroup('group1');

    expect(component.selectedGroupId).toBe('group1');
    expect(component.channels.length).toBe(1);
  });

  it('should navigate to channel chat window when selectChannel is called', () => {
    component.selectChannel('channel1');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard/chat', 'channel1']);
  });
});
