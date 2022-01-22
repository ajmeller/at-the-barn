import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { TokenService } from "spotify-auth";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public constructor(
    private _spotifyService: SpotifyService,
    private _tokenService: TokenService
  ) {}

  private stream: Subscription | null = null;

  ngOnDestroy(): void {
    if (this.stream) {
      this.stream.unsubscribe();
    }
  }
  ngOnInit(): void {
    const stream = this._tokenService.authTokens.pipe(
      switchMap((x) => {
        return this._spotifyService.fetchUserInfo();
      })
    );
    this.stream = stream.subscribe((x) => (this.user = x));
  }

  public user = {};

  public hasUser(): boolean {
    return !!this.user;
  }

  public get jUser(): {} {
    return JSON.stringify(this.user, null, 2);
  }
}
