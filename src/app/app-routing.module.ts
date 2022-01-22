import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SpotifyAuthModule } from "spotify-auth";
import { LandingComponent } from "./components/landing/landing.component";
import { LibraryComponent } from "./components/library/library.component";
import { LoginComponent } from "./components/login/login.component";
import { RankingsComponent } from "./components/rankings/rankings.component";

const routes: Routes = [
  { path: "", redirectTo: "landing", pathMatch: "full" },
  { path: "landing", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "library", component: LibraryComponent },
  { path: "rankings", component: RankingsComponent },
  SpotifyAuthModule.authRoutes()[0],
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
