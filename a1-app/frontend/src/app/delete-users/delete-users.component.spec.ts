import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUsersComponent } from './delete-users.component';

describe('DeleteUsersComponent', () => {
  let component: DeleteUsersComponent;
  let fixture: ComponentFixture<DeleteUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
