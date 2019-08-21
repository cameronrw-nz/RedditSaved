import { Injectable } from "@angular/core";
import * as Snoowrap from "snoowrap";

@Injectable({
  providedIn: "root"
})
export class RedditService {
  me: Snoowrap.RedditUser;

  constructor() {}

  async logon(username: string, password: string): Promise<boolean> {
    console.log(username);
    console.log(password);
    const wrapper = new Snoowrap({
      userAgent: "",
      clientId: "",
      clientSecret: "",
      username: username,
      password: password
    });

    let hasError = false;
    await wrapper
      .getMe()
      .then(value => {
        this.me = value;
      })
      .catch(reason => {
        console.log(reason.message);
        hasError = true;
      });

    return hasError;
  }
}
