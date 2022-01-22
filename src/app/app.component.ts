import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, TokenService } from 'spotify-auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'spotify-atthebarn';

  constructor(
    private _tokenService: TokenService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._authService.authorizedStream
      .pipe(filter((x) => !!x))
      .subscribe(() => {
        this._router.navigate(['landing']);
      });
  }

  public logout(): void {
    this._tokenService.clearToken();
    this._router.navigate(['login']);
  }
}
