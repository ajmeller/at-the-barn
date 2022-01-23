import { Injectable } from "@angular/core";
import "rxjs/add/operator/do"; //Required, yes!
import { TokenService, SpotifyAuthInterceptor } from "spotify-auth";
import { LoginService } from "../services/login.service";

@Injectable()
export class SpotifyAuthInterceptor2 extends SpotifyAuthInterceptor {
  doOnError(err: any): void {}

  constructor(tokenSvc: TokenService) {
    super(tokenSvc);
  }
}
