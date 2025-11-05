import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  API = "http://localhost:8085"; // Base API URL

  constructor(private http: HttpClient) {}

  /**
   * Adds a new Employee.
   * @param employeeData - The Employee data to add.
   */
  public addEmployee(employeeData: any) {
    return this.http.post(`${this.API}/employee`, employeeData);
  }

  /**
   * Fetches all Employees from the backend.
   */
  public getEmployees() {
    return this.http.get(`${this.API}/employee`);
  }

  /**
   * Deletes an Employee by ID.
   * @param employeeId - The ID of the Employee to delete.
   */
  public deleteEmployee(employeeId: number) {
    return this.http.delete(`${this.API}/employee/${employeeId}`);
  }

  /**
   * Updates an Employee's details.
   * @param employee - The updated Employee data.
   */
  public updateEmployee(employee: any) {
    const employeeId = employee.employeeId || employee.employeeId; // Use `id` extracted in the component
    if (!employeeId) {
      throw new Error('Employee ID is required for updating employee data.');
    }
    return this.http.put(`${this.API}/employee/${employeeId}`, employee);
  }
}
