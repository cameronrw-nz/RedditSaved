import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRedditSaved } from '../interfaces/IRedditSaved';
import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-saved-display-footer',
  templateUrl: './saved-display-footer.component.html',
  styleUrls: ['./saved-display-footer.component.scss']
})
export class SavedDisplayFooterComponent implements OnInit {
  @Input() selectedIds: string[] = [];
  @Input() savedRedditItems: IRedditSaved[] = [];
  @Output() clearSelection = new EventEmitter<void>();

  constructor(private redditService: RedditService) { }

  ngOnInit(): void {
  }

  unsavePosts() {
    this.redditService.unsavePosts(this.selectedIds);
  }
}
