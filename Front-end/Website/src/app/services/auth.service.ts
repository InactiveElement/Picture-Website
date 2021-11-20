import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  signup(user: Omit<User, "id">): Observable<User | any> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: any) => {
          this.userId = tokenObject.userId;
          // localStorage.setItem("token", tokenObject.token);
          // localStorage.setItem("userId", tokenObject.userId);
          // localStorage.setItem("username", tokenObject.username);
          // this.isUserLoggedIn$.next(true);
          // this.router.navigate(["home"]);
        }),
        catchError(
          this.errorHandlerService.handleError<any>("signup")
        )
      );
  }

  login(
    email: Pick<User, "email">,
    password: Pick<User, "password">
  ): Observable<{
    token: string;
    userId: Pick<User, "id">;
  } | any> {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: any) => {
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          localStorage.setItem("userId", tokenObject.userId);
          localStorage.setItem("username", tokenObject.username);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["home"]);
        }),
        catchError(
          this.errorHandlerService.handleError<any>("login")
        )
      );
  }
}