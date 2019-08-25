import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { SavedDisplayComponent } from "./saved-display/saved-display.component";
import { FilterComponent } from './filter/filter.component';
import { SelectedItemDirective } from './selected-item.directive';

@NgModule({
  declarations: [AppComponent, LoginComponent, SavedDisplayComponent, FilterComponent, SelectedItemDirective],
  imports: [BrowserModule, HttpClientModule, FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
