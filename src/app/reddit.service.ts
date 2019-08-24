import { Injectable } from "@angular/core";
import * as Snoowrap from "snoowrap";
import { IRedditSaved } from "./interfaces/IRedditSaved";
import { Subject, BehaviorSubject } from "rxjs";
import { IRedditSavedFilter } from "./interfaces/IRedditSavedFilter";

@Injectable({
  providedIn: "root"
})
export class RedditService {
  me: Snoowrap.RedditUser;
  items: BehaviorSubject<IRedditSaved[]> = new BehaviorSubject<IRedditSaved[]>(
    []
  );
  filter: BehaviorSubject<IRedditSavedFilter> = new BehaviorSubject<
    IRedditSavedFilter
  >({ subreddits: [] });

  constructor() {}

  async logon(username: string, password: string): Promise<boolean> {
    const wrapper = new Snoowrap({
      userAgent: "Saved Info/0.1 by Darzolak",
      clientId: "Y8k5r0IZvt4r7g",
      clientSecret: "vHf1KZ7ZmSdLi781tmYH2oPOhdA",
      username: username,
      password: password
    });

    let isSaveSuccesful = false;
    await wrapper
      .getMe()
      .then(value => {
        this.me = value;
        isSaveSuccesful = true;
      })
      .catch(reason => {});

    return isSaveSuccesful;
  }

  getloggedOnUserName() {
    return this.me.name;
  }

  async getAllRedditItems() {
    let saved = await this.me.getSavedContent();

    let previous = 0;
    while (saved.length !== previous) {
      const tempItems: IRedditSaved[] = [];
      console.log(saved.length);

      saved.forEach(element => {
        if (element as Snoowrap.Submission) {
          const submission = element as Snoowrap.Submission;
          const baseDate = new Date(0);
          baseDate.setUTCSeconds(element.created_utc);

          tempItems.push({
            id: submission.id,
            name: submission.title,
            link: "https://www.reddit.com" + element.permalink,
            subreddit: element.subreddit_name_prefixed,
            date: baseDate
          });
        }
      });

      this.items.next(tempItems);

      previous = saved.length;

      saved = await saved.fetchMore({ amount: 50 });
    }
  }

  updateFilteredSubreddits(subreddit: string) {
    const filter = this.filter.getValue();
    if (filter.subreddits.includes(subreddit)) {
      filter.subreddits = filter.subreddits.filter(id => id !== subreddit);
    } else {
      filter.subreddits.push(subreddit);
    }
    this.filter.next(filter);
  }
}