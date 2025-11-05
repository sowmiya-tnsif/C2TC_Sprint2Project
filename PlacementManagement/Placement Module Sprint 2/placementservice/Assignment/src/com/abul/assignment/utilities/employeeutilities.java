package com.abul.assignment.utilities;
import com.abul.assignment.employees.Employee;

public class employeeutilities {
	 public void displayEmployee(Employee emp) {
	        System.out.println("Name: " + emp.getname());
	        System.out.println("Employee ID: " + emp.employeeid());
	        System.out.println("Salary: " + emp.salary());
	 }
	  protected void increaseSalary(Employee emp, double percent) {
	        double newSalary = emp.salary() + (emp.salary() * percent / 100);
	        emp.setsalary(newSalary);
	 

}
}