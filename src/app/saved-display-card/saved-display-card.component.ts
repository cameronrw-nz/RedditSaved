import { Component, Input, OnInit } from '@angular/core';
import { IRedditSaved } from '../interfaces/IRedditSaved';

@Component({
  selector: 'app-saved-display-card',
  templateUrl: './saved-display-card.component.html',
  styleUrls: ['./saved-display-card.component.scss']
})
export class SavedDisplayCardComponent implements OnInit {
  @Input() item: IRedditSaved = { date: new Date(), id: Math.random().toString(), link: "https://example.com", name: "This is my saved post", subreddit: "Subreddit Name" };
  @Input() isSelected: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
}