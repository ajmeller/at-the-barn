import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public albums: any[];
  public randomAlbumOfDay;

  public tracks: any[];
  public randomSongOfDay;

  public constructor(private _spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this._spotifyService.getUserAlbums(0).subscribe((x: any) => {
      if (x.items) {
        this.albums = x.items;
        this.randomAlbumOfDay = this.getItemAtRandomIndex(this.albums).album;
      }
    });
  }

  public getItemAtRandomIndex(items: any[]) {
    const randomNum = Math.floor(Math.random() * items.length) - 1;
    return items[randomNum];
  }
}
