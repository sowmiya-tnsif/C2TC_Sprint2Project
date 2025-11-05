import { Component, OnInit } from '@angular/core';
import { UserService } from './User.service';

interface Placement {
  id: number | null;
  name: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-user-root',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.scss']
})
export class UserComponent implements OnInit {
  title = 'Placements';
  placements: Placement[] = [];
  newUser: Placement = { id: null, name: '', email: '', phoneNumber: '' };
  placementToUpdate: Placement = { id: null, name: '', email: '', phoneNumber: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getPlacements();
  }

  register(): void {
    console.log('Registering user:', this.newUser); // Debug log
    if (!this.newUser.name || !this.newUser.email || !this.newUser.phoneNumber) {
      alert('All fields are required.');
      return;
    }
    this.userService.registerPlacement(this.newUser).subscribe(
      () => {
        this.getPlacements();
        this.newUser = { id: null, name: '', email: '', phoneNumber: '' }; // Reset form after successful registration
      },
      error => alert('Error registering placement')
    );
  }

  getPlacements(): void {
    this.userService.getPlacements().subscribe(
      (response: Placement[]) => {
        this.placements = response;
      },
      error => alert('Error fetching placements')
    );
  }

  deletePlacement(placement: Placement): void {
    if (!placement.id) return;
    this.userService.deletePlacement(placement.id).subscribe(
      () => this.getPlacements(),
      error => alert('Error deleting placement')
    );
  }

  edit(placement: Placement): void {
    this.placementToUpdate = { ...placement };
  }

  updatePlacement(): void {
    if (!this.placementToUpdate.id) {
      alert('ID is missing.');
      return;
    }
    this.userService.updatePlacement(this.placementToUpdate).subscribe(
      () => {
        this.getPlacements();
        this.placementToUpdate = { id: null, name: '', email: '', phoneNumber: '' }; // Reset after update
      },
      error => alert('Error updating placement')
    );
  }
}
