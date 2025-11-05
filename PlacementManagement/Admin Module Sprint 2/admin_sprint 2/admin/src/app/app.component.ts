import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  adminDetails: any[] = [];
  adminToUpdate = { id: null, name: '', email: '', phoneNumber: '' };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getAdminDetails();
  }

  getAdminDetails() {
    this.adminService.getAdmin().subscribe(
      (resp: any) => {
        console.log(resp);  // Log the response
        this.adminDetails = Array.isArray(resp) ? resp : [];  // Ensure it's an array
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  

  register(form: NgForm) {
    if (form.valid) {
      this.adminService.registerAdmin(form.value).subscribe(
        () => {
          this.getAdminDetails();
          form.reset();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  edit(admin: any) {
    console.log(admin);  // Check if admin data is passed correctly
    this.adminToUpdate = { ...admin };
  }

  updateAdmin() {
    this.adminService.updateAdmin(this.adminToUpdate).subscribe(
      () => {
        this.getAdminDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteAdmin(admin: any) {
    this.adminService.deleteAdmin(admin.id).subscribe(
      () => {
        this.getAdminDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
