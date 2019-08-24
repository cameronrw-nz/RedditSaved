import { Component, OnInit } from "@angular/core";
import { RedditService } from "../reddit.service";
import { IRedditSaved } from "../interfaces/IRedditSaved";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
  subreddits: Map<string, number> = new Map<string, number>();

  constructor(private redditService: RedditService) {
    this.setSubreddits(this.redditService.items.getValue());
    this.redditService.items.subscribe(items => this.setSubreddits(items));
  }

  ngOnInit() {}

  selectSubreddit(subreddit: string) {
    this.redditService.updateFilteredSubreddits(subreddit);
  }

  setSubreddits(items: IRedditSaved[]) {
    this.subreddits = new Map<string, number>();
    items.forEach(item => {
      let currentSubreddit = this.subreddits.get(item.subreddit);
      if (currentSubreddit) {
        currentSubreddit += 1;
        this.subreddits.set(item.subreddit, currentSubreddit);
      } else {
        this.subreddits.set(item.subreddit, 1);
      }
    });
  }
}
