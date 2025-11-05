import { TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './Employee.component';
import { EmployeeService } from './Employee.service';
import { of } from 'rxjs';

describe('EmployeeComponent', () => {
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(async () => {
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', [
      'getEmployees',
      'addEmployee',
      'updateEmployee',
      'deleteEmployee'
    ]);
    mockEmployeeService.getEmployees.and.returnValue(of([])); // Mock response

    await TestBed.configureTestingModule({
      declarations: [EmployeeComponent],
      providers: [{ provide: EmployeeService, useValue: mockEmployeeService }],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Employees'`, () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('Employees');
  });

  it('should call getEmployees on init', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'getEmployees');
    component.ngOnInit();
    expect(component.getEmployees).toHaveBeenCalled();
  });

  it('should fetch employees from the service', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.componentInstance;
    component.getEmployees();
    expect(mockEmployeeService.getEmployees).toHaveBeenCalled();
  });

  it('should add a new employee using the service', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.componentInstance;
    const newEmployee = { name: 'John Doe', position: 'Manager', salary: 60000, id: null };
    spyOn(component, 'getEmployees'); // Ensure getEmployees is triggered after adding
    component.addEmployee({
      reset: () => {},
      value: newEmployee
    } as any);
    expect(mockEmployeeService.addEmployee).toHaveBeenCalledWith(newEmployee);
    expect(component.getEmployees).toHaveBeenCalled();
  });

  it('should update an employee using the service', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.componentInstance;
    const updatedEmployee = { id: 1, name: 'Jane Doe', position: 'Director', salary: 80000 };
    spyOn(component, 'getEmployees'); // Ensure getEmployees is triggered after updating
    component.employeeToUpdate = updatedEmployee;
    component.updateEmployee();
    expect(mockEmployeeService.updateEmployee).toHaveBeenCalledWith(updatedEmployee);
    expect(component.getEmployees).toHaveBeenCalled();
  });

  it('should delete an employee using the service', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.componentInstance;
    const employeeToDelete = { id: 1, name: 'John Doe', position: 'Manager', salary: 60000 };
    spyOn(component, 'getEmployees'); // Ensure getEmployees is triggered after deletion
    component.deleteEmployee(employeeToDelete);
    expect(mockEmployeeService.deleteEmployee).toHaveBeenCalledWith(employeeToDelete.id);
    expect(component.getEmployees).toHaveBeenCalled();
  });

  it('should set employeeToUpdate when editing an employee', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.componentInstance;
    const employeeToEdit = { id: 1, name: 'Jane Doe', position: 'Director', salary: 80000 };
    component.edit(employeeToEdit);
    expect(component.employeeToUpdate).toEqual(employeeToEdit);
  });
});