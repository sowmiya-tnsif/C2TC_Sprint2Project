import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './User.service';

interface User {
  id: number | null;  // Matches backend primary key
  username: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-user-root',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.scss']
})
export class UserComponent implements OnInit {
  title = 'Users';

  constructor(private userService: UserService) {}

  users: User[] = [];
  userToUpdate: User = {
    id: null,
    username: '',
    email: '',
    password: '',
    role: ''
  };

  ngOnInit(): void {
    console.log('Component initialized');
    this.getUsers();
  }

  /**
   * Registers a new User using the provided form data.
   * @param registerForm The form containing user data.
   */
  register(registerForm: NgForm): void {
    this.userService.registerUser(registerForm.value).subscribe(
      () => {
        this.getUsers();
      },
      error => console.error('Error registering user:', error)
    );
  }

  /**
   * Fetches all users from the backend and updates the local state.
   */
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        console.log('Fetched users:', response); // Log the response
        if (Array.isArray(response)) {
          this.users = response.map((user: any) => ({
            id: user.id || user.UserId,
            username: user.username || '',
            email: user.email || '',
            password: user.password || '',
            role: user.role || ''
          }));
          console.log('Processed users:', this.users); // Check the processed users
        } else {
          console.error('Unexpected response structure:', response);
          this.users = [];
        }
      },
      error => {
        console.error('Error fetching users:', error);
        alert('Error fetching users');
      }
    );
  }
  

  /**
   * Deletes a user by ID.
   * @param user The user to delete.
   */
  deleteUser(user: User): void {
    if (!user.id) {
      console.error('User ID is undefined. Cannot delete user.', user);
      return;
    }
    this.userService.deleteUser(user.id).subscribe(
      () => {
        console.log('User deleted successfully.');
        this.getUsers();
      },
      error => {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    );
  }

  /**
   * Sets the userToUpdate object for editing.
   * @param user The user to edit.
   */
  edit(user: User): void {
    this.userToUpdate = { ...user };
  }

  /**
   * Updates an existing user with the current userToUpdate values.
   */
  updateUser(): void {
    if (this.userToUpdate.id) {
      // Ensure the ID is being passed to the backend
      this.userService.updateUser(this.userToUpdate).subscribe(
        () => {
          console.log('User updated successfully.');
          this.getUsers();
          this.userToUpdate = {
            id: null,
            username: '',
            email: '',
            password: '',
            role: ''
          }; 
        },
        error => {
          console.error('Error updating user:', error);
          alert('Error updating user');
        }
      );
    } else {
      console.error('User ID is undefined. Cannot update user.');
      alert('User ID is undefined. Cannot update user.');
    }
  }
}
