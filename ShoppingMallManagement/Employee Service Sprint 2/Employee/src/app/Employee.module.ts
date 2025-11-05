import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeComponent } from './Employee.component'; // Main component for managing users

@NgModule({
  declarations: [
    EmployeeComponent 
  ],
  imports: [
    BrowserModule,  
    FormsModule,    
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [EmployeeComponent] 
})
export class EmployeeModule {}