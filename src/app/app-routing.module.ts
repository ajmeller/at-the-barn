import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SpotifyAuthModule } from "spotify-auth/src/module";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { TopAlbumsComponent } from "./components/top-albums/top-albums.component";
import { TopArtistsComponent } from "./components/top-artists/top-artists.component";
import { TopSongsComponent } from "./components/top-songs/top-songs.component";

const routes: Routes = [
  { path: "", redirectTo: "landing", pathMatch: "full" },
  { path: "landing", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "top-songs", component: TopSongsComponent },
  { path: "top-albums", component: TopAlbumsComponent },
  { path: "top-artists", component: TopArtistsComponent },
  //SpotifyAuthModule.authRoutes()[0],
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
