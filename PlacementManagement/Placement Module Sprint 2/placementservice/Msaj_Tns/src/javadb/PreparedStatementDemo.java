package javadb;

import java.sql.*;

public class PreparedStatementDemo {

	public static void main(String[] args) {

		String url = "jdbc:postgresql://localhost:5432/Msaj_java";
		String username = "postgres";
		String password = "022005";
		
		String name = "bob";
		String department = "AI&DS";
		
		
		
		String query = "INSERT INTO studentdetails (name,department) VALUES(?, ?) ";
		
		
		try {
			
			//Load the driver - 2nd step
			Class.forName("org.postgresql.Driver");
			
			
			//Establishing the connection - 3rd step
			
			Connection con = DriverManager.getConnection(url, username, password);
			
			//Define SQL Query - 4th step
			
			PreparedStatement st = con.prepareStatement(query);
			
			//Execting the query - 5th step
			
			st.setString(1, name);
			st.setString(2, department);
			
			
			
			//Process the Result - 6th Step
			
			int rs = st.executeUpdate();
			System.out.println(rs +" row/s affected");
			
			
			
			//close the resources - 7th
			
			st.close();
			con.close();
			
			
		}
		

		catch(Exception e)
		{
			e.printStackTrace();
		}
		


	}

}
