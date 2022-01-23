import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthConfig, AuthService, TokenService } from "spotify-auth";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { withLatestFrom } from "rxjs/operator/withLatestFrom";

@Injectable()
export class LoginService {
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get isLoggedIn(): boolean {
    const token = this.parseToken();
    return token !== null;
  }

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _tokenService: TokenService
  ) {
    this._tokenService.authTokens.subscribe((token) => {
      if (!this.parseToken() && token) {
        sessionStorage.setItem("user-token", JSON.stringify(token));
        this._router.navigate(["home"]);
      } else if (this.parseToken() === "" || this.parseToken() === null) {
        sessionStorage.setItem("user-token", null);
      }
      this.isLoggedIn$.next(this.isLoggedIn);
    });
  }

  parseToken(): string {
    const userToken = sessionStorage.getItem("user-token");
    return userToken ? JSON.parse(userToken) : null;
  }

  login(): void {
    const ac: AuthConfig = {
      client_id: environment.auth0.clientId,
      response_type: "token",
      redirect_uri: environment.auth0.redirectUri,
      state: "",
      show_dialog: true,
      scope: ["user-read-private", "user-read-email", "user-library-read"],
    };
    this._authService.configure(ac).authorize();
  }

  public logout(): void {
    this._tokenService.clearToken();
    sessionStorage.removeItem("user-token");
    this.isLoggedIn$.next(this.isLoggedIn);
    this._router.navigate(["login"]);
  }
}
