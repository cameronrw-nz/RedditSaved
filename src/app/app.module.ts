import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from "@angular/material/button"
import { MatListModule } from "@angular/material/list"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatToolbarModule } from "@angular/material/toolbar"

import { AppComponent } from "./app.component";
import { FilterComponent } from './filter/filter.component';
import { LoginComponent } from "./login/login.component";
import { SavedDisplayCardComponent } from './saved-display-card/saved-display-card.component';
import { SavedDisplayComponent } from "./saved-display/saved-display.component";
import { SavedDisplayFooterComponent } from './saved-display-footer/saved-display-footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, LoginComponent, SavedDisplayComponent, FilterComponent, SavedDisplayCardComponent, SavedDisplayFooterComponent],
  imports: [
    // Basic Modules
    BrowserModule, HttpClientModule, FormsModule, CommonModule, BrowserAnimationsModule,

    // Material UI modules
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule,
    MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
