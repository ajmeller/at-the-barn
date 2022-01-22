import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, TokenService } from "spotify-auth";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "spotify-atthebarn";
  public isAuth$: Observable<boolean>;

  constructor(
    private _tokenService: TokenService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._authService.authorizedStream
      .pipe(filter((x) => !!x))
      .subscribe((_) => {
        this._router.navigate(["landing"]);
      });

    this.isAuth$ = this._tokenService.authTokens.pipe(
      map((authToken) => !!authToken)
    );
  }
}
