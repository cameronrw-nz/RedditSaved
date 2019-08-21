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
      .catch(reason => {
        console.log(reason.message);
      });

    return isSaveSuccesful;
  }

  getloggedOnUserName() {
    return this.me.name;
  }
}
