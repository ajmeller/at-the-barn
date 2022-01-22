import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { of } from "rxjs/observable/of";

@Injectable()
export class SpotifyService {
  private apiUserUrl: string = "https://api.spotify.com/v1/me";
  private apiAlbumsUrl: string = "https://api.spotify.com/v1/me/albums";

  private user: {} = {};
  private user$: BehaviorSubject<{}>;

  constructor(private http: HttpClient) {
    this.user$ = new BehaviorSubject<{}>(this.user);
  }

  public fetchUserInfo(): Observable<{}> {
    return this.http.get(this.apiUserUrl).pipe(
      tap((user: {}) => {
        this.user$.next(this.user);
      }),
      catchError(this.handleError("getSelf"))
    );
  }

  public getUserAlbums(offset: number): Observable<{}> {
    return this.http
      .get(`${this.apiAlbumsUrl}/?limit=50&offset=${offset}`)
      .pipe(
        //return this.http.get(`${this.apiAlbumsUrl}`).pipe(
        tap((user: {}) => {
          this.user$.next(this.user);
        }),
        catchError(this.handleError("getSelfAlbums"))
      );
  }

  public getUserStream(): Observable<{}> {
    return this.user$.asObservable();
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      (result as any) = error;
      return of(result as T);
    };
  }
}
