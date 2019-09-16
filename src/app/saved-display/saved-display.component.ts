import { Component, OnInit, Input } from "@angular/core";
import { RedditService } from "../reddit.service";
import { IRedditSaved } from "../interfaces/IRedditSaved";
import { IRedditSavedFilter } from "../interfaces/IRedditSavedFilter";

@Component({
  selector: "app-saved-display",
  templateUrl: "./saved-display.component.html",
  styleUrls: ["./saved-display.component.scss"]
})
export class SavedDisplayComponent implements OnInit {
  @Input() isShowingFilter: boolean;
  items: IRedditSaved[] = [];
  display: IRedditSaved[] = [];
  filter: IRedditSavedFilter;
  selectedIds: string[] = [];

  constructor(private redditService: RedditService) {
    this.redditService.items.subscribe(items => {
      this.items = items;
      this.selectedIds = [];
      this.setDisplay(items, this.filter);
    });

    this.redditService.filter.subscribe(filter => {
      this.selectedIds = [];
      this.filter = filter;
      this.setDisplay(this.items, filter);
    });
  }

  async ngOnInit() {
    await this.redditService.getAllRedditItems();
  }

  setDisplay(items: IRedditSaved[], filter: IRedditSavedFilter) {
    this.display = [];
    items.forEach(item => {
      if (
        filter.subreddits.includes(item.subreddit) ||
        filter.subreddits.length === 0
      ) {
        this.display.push(item);
      }
    });
  }

  selectPost(selectedId: string) {
    if (this.selectedIds.includes(selectedId)) {
      this.selectedIds = this.selectedIds.filter(id => id !== selectedId);
    } else {
      this.selectedIds.push(selectedId);
    }
  }

  unsavePosts() {
    this.redditService.unsavePosts(this.selectedIds);
  }
}
