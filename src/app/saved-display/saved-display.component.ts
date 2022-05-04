import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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
  @Output() toggleFilter = new EventEmitter<void>();

  display: IRedditSaved[] = [];
  searchText: string | undefined;
  selectedIds: string[] = [];
  isSmallDevice = window.innerWidth < 500;

  constructor(private redditService: RedditService) {
    this.redditService.filteredItems.subscribe(items => this.setDisplay(items, this.redditService.filter.value));

    this.redditService.filter.subscribe(filter => this.setDisplay(this.redditService.filteredItems.value, filter))
  }

  clearSelectedItems() {
    this.selectedIds = [];
  }

  async ngOnInit() {
    await this.redditService.getAllRedditItems();
  }

  onSearchChanged(searchText: string) {
    this.searchText = searchText;
    this.redditService.updateFilteredText(searchText);
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

  setDisplay(items: IRedditSaved[], filter?: IRedditSavedFilter) {
    if (!filter) {
      return;
    }

    const visisbleItems = items.slice(filter.pageIndex * 50, filter.pageIndex * 50 + 50);

    const isAllVisisbleItemsShown = visisbleItems.every(item => this.display.findIndex(i => i.id === item.id) >= 0);

    if (!isAllVisisbleItemsShown) {
      this.display = visisbleItems;
      this.selectedIds = [];
    }
  }

  unsavePosts() {
    this.redditService.unsavePosts(this.selectedIds);
  }
}
