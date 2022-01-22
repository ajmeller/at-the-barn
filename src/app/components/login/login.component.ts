import { Component, OnInit } from "@angular/core";
import { AuthConfig, AuthService } from "spotify-auth";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  public login(): void {
    const ac: AuthConfig = {
      client_id: environment.auth0.clientId,
      response_type: "token",
      redirect_uri: "http://localhost:4200/authorized",
      state: "",
      show_dialog: true,
      scope: ["user-read-private", "user-read-email", "user-library-read"],
    };
    this._authService.configure(ac).authorize();
  }

  ngOnInit(): void {}
}
