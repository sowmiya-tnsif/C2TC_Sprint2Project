import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CertificateService } from './certificate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Certificate';
  CertificateDetails: any = null;
  CertificateToUpdate = {
    id: null,
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
  };
  isLoading = false; // Added loading indicator state

  constructor(private Certificate: CertificateService) {}

  ngOnInit() {
    this.getCertificateDetails();
  }

  // Method to handle errors and display user-friendly messages
  handleError(error: any) {
    alert('An error occurred: ' + error.message);
  }

  // Register a new certificate
  register(registerForm: NgForm) {
    if (registerForm.valid) {
      this.Certificate.registerCertificates(registerForm.value).subscribe(
        (resp: any) => {
          console.log(resp);
          registerForm.reset();
          this.getCertificateDetails();
        },
        (err: any) => {
          console.log(err);
          this.handleError(err); // Show error message
        }
      );
    } else {
      alert('Please fill all the required fields!');
    }
  }

  // Get the certificate details from the backend
  getCertificateDetails() {
    this.isLoading = true; // Set loading to true when fetching data
    this.Certificate.getCertificates().subscribe(
      (resp: any) => {
        console.log(resp);
        this.CertificateDetails = resp;
        this.isLoading = false; // Set loading to false after data is fetched
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false; // Set loading to false if error occurs
        this.handleError(err); // Show error message
      }
    );
  }

  // Delete a certificate after confirmation
  deleteCertificate(Certificate: any) {
    if (confirm('Are you sure you want to delete this certificate?')) {
      this.Certificate.deleteCertificates(Certificate.id).subscribe(
        (resp: any) => {
          console.log(resp);
          this.getCertificateDetails();
        },
        (err: any) => {
          console.log(err);
          this.handleError(err); // Show error message
        }
      );
    }
  }

  // Edit a certificate
  edit(Certificate: any) {
    this.CertificateToUpdate = { ...Certificate };
  }

  // Update the certificate
  updateCertificate() {
    this.Certificate.updateCertificates(this.CertificateToUpdate).subscribe(
      (resp: any) => {
        console.log(resp);
        this.getCertificateDetails();
        // Reset the form after update
        this.CertificateToUpdate = { id: null, name: '', issuer: '', issueDate: '', expiryDate: '' };
      },
      (err: any) => {
        console.log(err);
        this.handleError(err); // Show error message
      }
    );
  }
}
