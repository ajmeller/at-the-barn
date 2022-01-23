import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const storageToken = sessionStorage.getItem("user-token");
    const loggedToken = storageToken ? JSON.parse(storageToken) : null;
    if (loggedToken) {
      request = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${loggedToken}`),
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this._router.navigate(["login"]);
          return ErrorObservable.create(error);
        }
        return ErrorObservable.create(error);
      })
    );
  }
}
