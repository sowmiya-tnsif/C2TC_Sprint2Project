import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AppComponent } from './app.component';  // Keep the import

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserFormComponent
    // Do not declare AppComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppComponent  // Import the standalone AppComponent here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
