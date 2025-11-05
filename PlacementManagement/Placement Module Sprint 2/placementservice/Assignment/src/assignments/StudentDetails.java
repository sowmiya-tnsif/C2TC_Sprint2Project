package assignments;

import java.util.Scanner;

public class StudentDetails {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter your name:");
        String name = sc.nextLine().trim();
        System.out.println("Enter your roll no.:");
        String rollNumber = sc.nextLine().trim();
        System.out.println("Enter your grade::");
        String grade = sc.nextLine().trim();
        System.out.println("Enter your Percentage:");
        String percentage = sc.nextLine().trim();

        System.out.println("your name is :"+name);
        System.out.println("your roll no. is :"+rollNumber);
        System.out.println("your grade is:"+grade);
        System.out.println("your percentage is:"+percentage);

        sc.close();
    }
}
