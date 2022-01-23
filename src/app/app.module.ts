import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SpotifyAuthModule } from "spotify-auth";
import { SpotifyService } from "./services/spotify.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { NavComponent } from "./components/nav/nav.component";
import { RankingsComponent } from "./components/rankings/rankings.component";
import { LandingComponent } from "./components/landing/landing.component";
import { LibraryComponent } from "./components/library/library.component";
import { LoginService } from "./services/login.service";
import { AuthenticationInterceptor } from "./interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    RankingsComponent,
    LandingComponent,
    LibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SpotifyAuthModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [
    SpotifyService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
