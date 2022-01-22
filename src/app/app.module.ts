import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { NavComponent } from "./components/nav/nav.component";
import { RankingsComponent } from "./components/rankings/rankings.component";
import { LandingComponent } from "./components/landing/landing.component";
import { TopAlbumsComponent } from "./components/top-albums/top-albums.component";
import { TopSongsComponent } from "./components/top-songs/top-songs.component";
import { TopArtistsComponent } from "./components/top-artists/top-artists.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SpotifyAuthModule } from "spotify-auth";
import { SpotifyService } from "./services/spotify.service";
import { SpotifyAuthInterceptor2 } from "./interceptors/spotify-auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    RankingsComponent,
    LandingComponent,
    TopAlbumsComponent,
    TopSongsComponent,
    TopArtistsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SpotifyAuthModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    SpotifyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpotifyAuthInterceptor2,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
