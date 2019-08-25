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
  isShowingFilter: boolean;
  selectedSubreddits: string[];
  numberOfSubreddits: number;

  constructor(private redditService: RedditService) {
    this.isShowingFilter = window.innerWidth > 700;
    this.redditService.filter.subscribe(
      filter => (this.selectedSubreddits = filter.subreddits)
    );
    this.redditService.numberOfSubreddits.subscribe(numberOfSubreddits => {
      this.numberOfSubreddits = numberOfSubreddits;
      console.log(numberOfSubreddits);
    });
  }

  login() {
    this.isLoggingIn = true;
  }

  onLoggedIn() {
    this.isLoggingIn = false;
    this.loggedInUserName = this.redditService.getloggedOnUserName();
  }

  toggleFilter() {
    this.isShowingFilter = !this.isShowingFilter;
  }
}
