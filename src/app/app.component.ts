import { Component } from "@angular/core";
import { RedditService } from "./reddit.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  isLoggingIn = true;
  loggedInUserName: string | undefined;
  isShowingFilter: boolean;
  selectedSubreddits: string[];
  numberOfSubreddits: number;
  hasFinishedLoadingSavedPosts = false;

  constructor(private redditService: RedditService) {
    this.isShowingFilter = window.innerWidth > 700;
    this.redditService.filter.subscribe(
      filter => (this.selectedSubreddits = filter.subreddits)
    );
    this.redditService.numberOfSubreddits.subscribe(numberOfSubreddits => {
      this.numberOfSubreddits = numberOfSubreddits;
    });
    this.redditService.hasFinishedLoadingSavedPosts.subscribe(
      hasFinishedLoadingSavedPosts =>
        (this.hasFinishedLoadingSavedPosts = hasFinishedLoadingSavedPosts)
    );
  }

  onLoggedIn() {
    this.isLoggingIn = false;
    this.loggedInUserName = this.redditService.getloggedOnUserName();
  }

  toggleFilter() {
    this.isShowingFilter = !this.isShowingFilter;
  }

  clearSelectedSubreddits() {
    this.redditService.updateFilteredSubreddits([]);
  }

  async refreshPosts() {
    this.hasFinishedLoadingSavedPosts = false;
    await this.redditService.getAllRedditItems();
    this.hasFinishedLoadingSavedPosts = true;
  }

  logout() {
    this.loggedInUserName = undefined;
    this.isLoggingIn = true;
    this.redditService.logout();
  }
}
