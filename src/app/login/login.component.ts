import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { RedditService } from "../reddit.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output() onLoggedIn = new EventEmitter<void>();

  isLoggingIn: boolean = false;
  isSaveSuccessful: boolean | undefined = undefined;
  password: string | undefined;
  username: string | undefined;

  constructor(private redditService: RedditService) { }

  ngOnInit() { }

  onLogon(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.username || !this.password) {
      return;
    }

    this.isLoggingIn = true;
    this.redditService.logon(this.username, this.password).then(result => {
      this.isSaveSuccessful = result;
      if (this.isSaveSuccessful) {
        this.onLoggedIn.emit();
      }
    });
  }
}
