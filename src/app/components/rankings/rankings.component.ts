import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: "app-rankings",
  templateUrl: "./rankings.component.html",
  styleUrls: ["./rankings.component.scss"],
})
export class RankingsComponent implements OnInit {
  public topArtists: any[];
  public topTracks: any[];

  constructor(private _spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this._spotifyService.getUserTopArtists().subscribe((x: any) => {
      if (x.items) {
        this.topArtists = x.items;
      }
    });

    this._spotifyService.getUserTopTracks().subscribe((x: any) => {
      if (x.items) {
        this.topTracks = x.items;
      }
    });
  }
}
