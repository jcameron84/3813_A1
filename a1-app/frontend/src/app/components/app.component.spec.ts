import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title to "Chat app"', () => {
    expect(component.title).toBe('Chat app');
  });

  it('should initialize users in localStorage if not already set', () => {
    localStorage.removeItem('users'); // Ensure the test is isolated

    component.ngOnInit();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('superuser@example.com');
    expect(users[0].role).toBe('superUser');
  });

  it('should not override users if already initialized in localStorage', () => {
    localStorage.setItem('users', JSON.stringify([{ email: 'test@example.com' }]));

    component.ngOnInit();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('test@example.com');
  });


  it('should render title in the template', () => {
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('Chat app');
  });
});
