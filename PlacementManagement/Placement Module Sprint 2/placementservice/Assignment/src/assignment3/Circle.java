package assignment3;
import java.util.Scanner;

public class Circle {
	double radius;
	String colour;
	
	
	public void getinput() {
		Scanner sc = new Scanner(System.in);
		
		System.out.println("Enter Radius:");
		radius = sc.nextDouble();
		sc.nextLine();
		
		System.out.println("Enter Colour:");
		colour = sc.nextLine();
				
	}
	public void calcarea() {
		double area = Math.PI * radius * radius;
		System.out.println("radius is:"+ radius);
		System.out.println("colour is:" + colour);
		System.out.println("Area is :"+ area);
		
	
	}
	public static void main(String[] args) {
		Circle ci = new Circle();
		ci.getinput();
		ci.calcarea();
		
		
	}

}
