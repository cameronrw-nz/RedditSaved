import { Component, OnInit } from "@angular/core";
import { RedditService } from "../reddit.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  hasError: boolean;

  constructor(private redditService: RedditService) {}

  ngOnInit() {}

  async onLogon() {
    this.hasError = await this.redditService.logon(
      this.username,
      this.password
    );
  }
}
