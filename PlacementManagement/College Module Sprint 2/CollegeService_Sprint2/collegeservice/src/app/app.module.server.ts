import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,        // Import the main AppModule
    ServerModule      // Import Angular's ServerModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
