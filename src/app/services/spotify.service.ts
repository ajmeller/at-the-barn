import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { of } from "rxjs/observable/of";

@Injectable()
export class SpotifyService {
  private spotifyBaseUrl: string = "https://api.spotify.com/v1";

  private user: {} = {};
  private user$: BehaviorSubject<{}>;

  constructor(private http: HttpClient) {
    this.user$ = new BehaviorSubject<{}>(this.user);
  }

  public getUserAlbums(offset: number): Observable<{}> {
    return this.http
      .get(`${this.spotifyBaseUrl}/me/albums/?limit=50&offset=${offset}`)
      .pipe(catchError(this.handleError("getSelfAlbums")));
  }

  public getRecommendedTracks(
    artistId: string,
    genre: string,
    trackId: string
  ): Observable<{}> {
    return this.http
      .get(`${this.spotifyBaseUrl}/recommendations/?seed_artists=${artistId}`)
      .pipe(catchError(this.handleError("getRecommendations")));
  }

  public getUserTopArtists(): Observable<{}> {
    return this.http
      .get(`${this.spotifyBaseUrl}/me/top/artists`)
      .pipe(catchError(this.handleError("getTopArtists")));
  }

  public getUserTopTracks(): Observable<{}> {
    return this.http
      .get(`${this.spotifyBaseUrl}/me/top/tracks?time_range=long_term`)
      .pipe(catchError(this.handleError("getTopTracks")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      (result as any) = error;
      return of(result as T);
    };
  }
}
