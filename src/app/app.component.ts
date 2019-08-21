import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "RedditSaved";
  isLoggingIn = false;

  login() {
    this.isLoggingIn = true;
  }
}
