package com.assignmentmain;
import com.abul.assignment.employees.manager;
import com.abul.assignment.employees.developer;
import com.abul.assignment.utilities.employeeutilities;

public class assignmentmain {
	 public static void main(String[] args) {
	        // Create Manager
	        manager m = new manager();
	        m.setname("Alice");
	        m.setemployeeid(101);
	        m.setsalary(80000);
	        m.setdepartment("HR");

	        // Create Developer
	        developer d = new developer();
	        d.setname("Bob");
	        d.setemployeeid(102);
	        d.setsalary(60000);
	        d.setprogramminglanguage("Java");

	        // Use Utilities
	        employeeutilities ut = new employeeutilities();

	        System.out.println("Manager Details:");
	        ut.displayEmployee(m);
	        System.out.println("Department: " + m.getdepartment());

	        System.out.println("Developer Details:");
	        ut.displayEmployee(d);
	        System.out.println("Programming Language: " + d.getprogramminglanguage());

}
}