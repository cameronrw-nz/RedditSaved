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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatToolbarModule } from "@angular/material/toolbar"

import { AppComponent } from "./app.component";
import { FilterComponent } from './filter/filter.component';
import { LoginComponent } from "./login/login.component";
import { SavedDisplayCardComponent } from './saved-display-card/saved-display-card.component';
import { SavedDisplayComponent } from "./saved-display/saved-display.component";
import { SelectedItemDirective } from './selected-item.directive';
import { SavedDisplayFooterComponent } from './saved-display-footer/saved-display-footer.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SavedDisplayComponent, FilterComponent, SelectedItemDirective, SavedDisplayCardComponent, SavedDisplayFooterComponent],
  imports: [
    // Basic Modules
    BrowserModule, HttpClientModule, FormsModule, CommonModule, BrowserAnimationsModule,

    // Material UI modules
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
