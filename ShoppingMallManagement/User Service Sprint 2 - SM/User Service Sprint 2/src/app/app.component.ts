import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   standalone: true,  // Keep the standalone flag
//   imports: [RouterModule]  // Add RouterModule to imports
  
// })
//import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Shopping Mall Management';
  users = [
    { id: 1, username: 'JohnDoe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, username: 'JaneSmith', email: 'jane.smith@example.com', role: 'User' },
    { id: 3, username: 'MikeRoss', email: 'mike.ross@example.com', role: 'Manager' },
  ];
}
