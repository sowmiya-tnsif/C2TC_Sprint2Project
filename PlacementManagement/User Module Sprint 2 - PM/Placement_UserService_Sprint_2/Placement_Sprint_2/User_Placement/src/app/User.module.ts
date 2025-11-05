import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserComponent } from './User.component'; // Main component for managing users

@NgModule({
  declarations: [
    UserComponent // Declares the UserComponent
  ],
  imports: [
    BrowserModule,  
    FormsModule,    
    HttpClientModule // For HTTP requests to fetch user data
  ],
  providers: [],
  bootstrap: [UserComponent] // Bootstraps the UserComponent
})
export class UserModule {}