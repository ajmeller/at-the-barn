import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  public isLoggedIn$: Observable<boolean> = this._loginService.isLoggedIn$;

  constructor(private _loginService: LoginService) {}

  ngOnInit(): void {}

  public logout(): void {
    this._loginService.logout();
  }
}
