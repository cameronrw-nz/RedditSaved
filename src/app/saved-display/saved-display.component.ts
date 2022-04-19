import { Component, OnInit, Input } from "@angular/core";
import { RedditService } from "../reddit.service";
import { IRedditSaved } from "../interfaces/IRedditSaved";
import { IRedditSavedFilter } from "../interfaces/IRedditSavedFilter";
import { MatSelectionListChange } from "@angular/material/list/selection-list";

@Component({
  selector: "app-saved-display",
  templateUrl: "./saved-display.component.html",
  styleUrls: ["./saved-display.component.scss"]
})
export class SavedDisplayComponent implements OnInit {
  @Input() isShowingFilter: boolean = false;
  display: IRedditSaved[] = [];
  filter: IRedditSavedFilter | undefined;
  items: IRedditSaved[] = [];
  searchText: string | undefined;
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

  setDisplay(items: IRedditSaved[], filter?: IRedditSavedFilter) {
    if (!filter) {
      return;
    }

    this.display = [];
    items.forEach(item => {
      if (
        (filter.subreddits.includes(item.subreddit) ||
          filter.subreddits.length === 0) &&
        ((item.subreddit &&
          item.subreddit
            .toLowerCase()
            .includes(filter.searchText.toLowerCase())) ||
          (item.name &&
            item.name.toLowerCase().includes(filter.searchText.toLowerCase())))
      ) {
        this.display.push(item);
      }
    });
  }

  onSelectionChanged(matSelectionListChange: MatSelectionListChange) {
    matSelectionListChange.options.forEach(option => {
      if (option.selected && !this.selectedIds.includes(option.value)) {
        this.selectedIds.push(option.value);
      }
      else {
        this.selectedIds = this.selectedIds.filter(id => id !== option.value);
      }
    })
  }

  unsavePosts() {
    this.redditService.unsavePosts(this.selectedIds);
  }

  clearSelectedItems() {
    this.selectedIds = [];
  }

  onSearchChanged(searchText: string) {
    this.searchText = searchText;
    this.redditService.updateFilteredText(searchText);
  }
}
