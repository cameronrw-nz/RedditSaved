import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { RedditService } from "../reddit.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output() onLoggedIn = new EventEmitter<void>();
  @Output() isLoggingIn = new EventEmitter<void>();

  isSaveSuccessful: boolean | undefined = undefined;
  password: string | undefined;
  username: string | undefined;

  constructor(private redditService: RedditService) {}

  ngOnInit() {}

  onLogon() {
    if (!this.username || !this.password) {
      return;
    }
    
    this.isLoggingIn.emit();
    this.redditService.logon(this.username, this.password).then(result => {
      this.isSaveSuccessful = result;
      if (this.isSaveSuccessful) {
        this.onLoggedIn.emit();
      }
    });
  }
}
