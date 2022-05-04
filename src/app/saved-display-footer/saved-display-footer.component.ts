import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { IRedditSaved } from '../interfaces/IRedditSaved';
import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-saved-display-footer',
  templateUrl: './saved-display-footer.component.html',
  styleUrls: ['./saved-display-footer.component.scss']
})
export class SavedDisplayFooterComponent implements OnInit {
  @Input() selectedIds: string[] = [];
  @Output() clearSelection = new EventEmitter<void>();
  visibleSavedRedditItems: IRedditSaved[] = [];
  isSmallDevice = window.innerWidth < 500;

  allSavedRedditItemsSize: number = 0;

  constructor(private redditService: RedditService) {
  }

  ngOnInit(): void {
    this.redditService.items.subscribe(items => this.allSavedRedditItemsSize = items.length);
    this.redditService.filteredItems.subscribe(items => this.visibleSavedRedditItems = items);
  }

  unsavePosts() {
    this.redditService.unsavePosts(this.selectedIds);
  }

  changePage(pageEvent: PageEvent) {
    this.redditService.updatePageIndex(pageEvent.pageIndex)
  }
}
