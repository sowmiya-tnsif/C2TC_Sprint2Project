import { TestBed } from '@angular/core/testing';
import { UserComponent } from './User.component';
import { UserService } from './User.service';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUsers']);
    mockUserService.getUsers.and.returnValue(of([])); // Mock response

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'User'`, () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('User');
  });

  it('should call getUsers on init', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'getUsers');
    component.ngOnInit();
    expect(component.getUsers).toHaveBeenCalled();
  });

  it('should fetch Users from the service', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;
    component.getUsers();
    expect(mockUserService.getUsers).toHaveBeenCalled();
  });
});
