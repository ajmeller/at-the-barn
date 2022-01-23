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
  public albums: {} = {};
  public user = {};
  public randomAlbumOfDay;

  ngOnInit(): void {
    const stream = this._tokenService.authTokens.pipe(
      switchMap((x) => {
        return this._spotifyService.getUserInfo();
      })
    );
    this.stream = stream.subscribe((x) => (this.user = x));

    this._spotifyService.getUserAlbums(0).subscribe((x: any) => {
      if (x.items) {
        this.albums = x.items;
        this.randomAlbumOfDay = this.getRandomAlbum(this.albums);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.stream) {
      this.stream.unsubscribe();
    }
  }

  public getRandomAlbum(albums) {
    const randomNum = Math.floor(Math.random() * albums.length) - 1;
    return albums[randomNum].album;
  }
}
