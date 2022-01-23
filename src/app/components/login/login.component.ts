import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private _loginService: LoginService) {}

  public login(): void {
    this._loginService.login();
  }

  ngOnInit(): void {}
}
