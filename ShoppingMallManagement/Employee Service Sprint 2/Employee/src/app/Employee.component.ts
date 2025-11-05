import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from './Employee.service';

interface Employee {
  employeeId: number | null; // Matches backend primary key
  name: string;
  position: string;
  salary: number;
}

@Component({
  selector: 'app-Employee-root',
  templateUrl: './Employee.component.html',
  styleUrls: ['./Employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  title = 'Employees';

  constructor(private employeeService: EmployeeService) {}

  employees: Employee[] = [];
  employeeToUpdate: Employee = {
    employeeId: null,
    name: '',
    position: '',
    salary: 0
  };

  ngOnInit(): void {
    this.getEmployees();
  }

  /**
   * Adds a new employee using the provided form data.
   * @param employeeForm The form containing employee data.
   */
  addEmployee(employeeForm: NgForm): void {
    const newEmployee = {
      name: employeeForm.value.name,
      position: employeeForm.value.position,
      salary: employeeForm.value.salary,
    };

    this.employeeService.addEmployee(newEmployee).subscribe(
      () => {
        console.log('Employee added successfully.');
        employeeForm.reset();
        this.getEmployees();
      },
      error => console.error('Error adding employee:', error)
    );
  }

  /**
   * Fetches all employees from the backend.
   */
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: any) => {
        console.log('Raw response from API:', response); // Debug log
  
        if (Array.isArray(response)) {
          this.employees = response.map((employee: any) => ({
            employeeId: employee.employeeId, // Ensure this matches the backend field
            name: employee.name || '',
            position: employee.position || '',
            salary: employee.salary || 0
          }));
          console.log('Processed employees:', this.employees);
        } else {
          console.error('Unexpected response structure:', response);
          this.employees = [];
        }
      },
      error => console.error('Error fetching employees:', error)
    );
  }
  
  

  /**
   * Deletes an employee by ID.
   * @param employee The employee to delete.
   */
  deleteEmployee(employee: Employee): void {
    console.log('Attempting to delete employee:', employee); // Debugging
  
    if (!employee.employeeId) {
      alert('Error: Employee ID is missing. Cannot delete.');
      return;
    }
  
    this.employeeService.deleteEmployee(employee.employeeId).subscribe(
      () => {
        console.log('Employee deleted successfully.');
        this.getEmployees();
      },
      error => {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee');
      }
    );
  }
  

  /**
   * Sets the employeeToUpdate object for editing.
   * @param employee The employee to edit.
   */
  edit(employee: Employee): void {
    console.log('Editing employee before assignment:', employee); // Debugging
    this.employeeToUpdate = { ...employee };
    console.log('Assigned employeeToUpdate:', this.employeeToUpdate); // Debugging
  }

  /**
   * Updates an existing employee with the current employeeToUpdate values.
   */
  updateEmployee(): void {
    console.log('Attempting to update employee:', this.employeeToUpdate); // Debugging
  
    if (!this.employeeToUpdate.employeeId) {
      alert('Error: Employee ID is missing. Cannot update.');
      return;
    }
  
    this.employeeService.updateEmployee(this.employeeToUpdate).subscribe(
      () => {
        console.log('Employee updated successfully.');
        this.getEmployees();
        this.resetEmployeeToUpdate();
      },
      error => {
        console.error('Error updating employee:', error);
        alert('Error updating employee');
      }
    );
  }
  
  

  /**
   * Resets the employeeToUpdate object to its default state.
   */
  private resetEmployeeToUpdate(): void {
    this.employeeToUpdate = {
      employeeId: null,
      name: '',
      position: '',
      salary: 0
    };
  }
}
export { EmployeeService };

