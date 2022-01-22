import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "spotify-auth";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor(private _tokenService: TokenService, private _router: Router) {}

  ngOnInit(): void {}

  public logout(): void {
    this._tokenService.clearToken();
    this._router.navigate(["login"]);
  }
}
