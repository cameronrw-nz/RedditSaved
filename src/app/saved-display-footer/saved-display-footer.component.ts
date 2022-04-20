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
  @Input() visibleSavedRedditItems: IRedditSaved[] = [];
  @Output() clearSelection = new EventEmitter<void>();
  isSmallDevice = window.innerWidth < 500;

  allSavedRedditItemsSize: number = 0;

  constructor(private redditService: RedditService) {
    redditService.items.subscribe(items => this.allSavedRedditItemsSize = items.length)
  }

  ngOnInit(): void {
  }

  unsavePosts() {
    this.redditService.unsavePosts(this.selectedIds);
  }

  changePage(pageEvent: PageEvent) {
    this.redditService.updatePageIndex(pageEvent.pageIndex)
  }
}
