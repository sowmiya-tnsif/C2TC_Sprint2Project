import { Component, OnInit } from '@angular/core';
import { PlacementService } from './placement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Placement Management';
  placements: any[] = [];
  editingPlacement: any = {}; // ✅ must initialize as empty object

  constructor(private placementService: PlacementService) {}

  ngOnInit(): void {
    this.loadPlacements();
  }


  loadPlacements() {
    this.placementService.getPlacements().subscribe({
      next: (data) => this.placements = data,
      error: (err) => console.error('Error fetching placements:', err)
    });
  }

  onRegister(form: any) {
    if (this.editingPlacement && this.editingPlacement.id) {
      // Update existing placement
      this.placementService.updatePlacement(this.editingPlacement.id, form.value).subscribe({
        next: () => {
          this.loadPlacements();
          this.editingPlacement = {}; // ✅ reset to empty object
          form.reset();
        },
        error: (err) => console.error('Error updating placement:', err)
      });
    } else {
      // Add new placement
      this.placementService.addPlacement(form.value).subscribe({
        next: () => {
          this.loadPlacements();
          this.editingPlacement = {}; // ✅ reset to empty object
          form.reset();
        },
        error: (err) => console.error('Error saving placement:', err)
      });
    }
  }

  editPlacement(placement: any) {
    this.editingPlacement = { ...placement }; // ✅ copy object to avoid binding issues
  }

  deletePlacement(id: number) {
    this.placementService.deletePlacement(id).subscribe({
      next: () => this.loadPlacements(),
      error: (err) => console.error('Error deleting placement:', err)
    });
  }

  cancelEdit() {
    this.editingPlacement = {}; // ✅ cancel editing
  }
}
