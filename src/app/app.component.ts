import { Component } from "@angular/core";
import { RedditService } from "./reddit.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  isLoggingIn: boolean = false;
  loggedInUserName: string | undefined;

  constructor(private redditService: RedditService) {}

  login() {
    this.isLoggingIn = true;
  }

  onLoggedIn() {
    this.isLoggingIn = false;
    this.loggedInUserName = this.redditService.getloggedOnUserName();
  }
}
