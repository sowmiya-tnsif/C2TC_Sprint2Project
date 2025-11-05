import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollegeService } from './college.service'; // Import your CollegeService
import { College } from './college.model'; // Assuming you've defined the model

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent implements OnInit {
  title = 'collegeservice';
  collegeDetails: College[] = [];  // Make sure it's an array

  // Model structure for the college to be updated
  collegeToUpdate: College = {
    id: 0,
    collegeName: '',
    location: '',
    collegeAdmin: ''
  };

  constructor(private collegeService: CollegeService) {}

  ngOnInit() {
    this.getColleges();
  }

  // Fetch all colleges from the backend
  getColleges() {
    this.collegeService.getColleges().subscribe(
      (data: College[]) => {
        this.collegeDetails = Array.isArray(data) ? data : []; // Ensure it's an array
      },
      (err: any) => console.error('Error fetching colleges:', err)
    );
  }

  // Register a new college
  register(registerForm: NgForm) {
    if (registerForm.invalid) return;

    // Pass the form values to add a new college
    this.collegeService.addCollege(registerForm.value).subscribe(
      (response) => {
        registerForm.reset();
        this.getColleges();
      },
      (error) => {
        console.error('Error adding college:', error);
      }
    );
  }

  // Open the edit form and pre-fill with current college data
  edit(college: College) {
    this.collegeToUpdate = { ...college };
  }

  // Update the college data
  updateCollege() {
    if (!this.collegeToUpdate.id) return;

    this.collegeService.updateCollege(this.collegeToUpdate).subscribe(
      (response: any) => {
        this.getColleges();
        this.closeModal();
      },
      (error: any) => {
        console.error('Error updating college:', error);
      }
    );
  }

  // Delete a college
  deleteCollege(college: College) {
    this.collegeService.deleteCollege(college.id).subscribe(
      () => this.getColleges(),
      (err: any) => console.error('Error deleting college:', err)
    );
  }

  // Close the modal after update
  closeModal() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.hide();
    }
  }
}
