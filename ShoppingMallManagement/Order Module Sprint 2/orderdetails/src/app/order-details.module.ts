import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { OrderDetailsComponent } from './order-details.component';




@NgModule({
  declarations: [
    OrderDetailsComponent 
  ],
  imports: [
    BrowserModule,  
    FormsModule,    
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [OrderDetailsComponent] 
})
export class OrderDetailsModule {}
