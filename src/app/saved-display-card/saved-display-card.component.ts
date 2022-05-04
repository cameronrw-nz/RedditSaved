import { Component, Input, OnInit } from '@angular/core';
import { IRedditSaved } from '../interfaces/IRedditSaved';

@Component({
  selector: 'app-saved-display-card',
  templateUrl: './saved-display-card.component.html',
  styleUrls: ['./saved-display-card.component.scss']
})
export class SavedDisplayCardComponent implements OnInit {
  @Input() item: IRedditSaved | undefined = undefined;
  @Input() isSelected: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  openLink() {
    if (!this.item?.link) {
      return;
    }

    window.open(this.item.link)
  }
}