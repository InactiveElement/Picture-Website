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
export class ImageService {
  private url = "http://localhost:3000/image";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  upload(uploadData): Observable<any> {
    return this.http.post(`${this.url}/upload`, uploadData)
        .pipe(
            first(),
            tap((fileName: any) => {
                localStorage.setItem("fileName", fileName);
            }),
            catchError(
                this.errorHandlerService.handleError<any>("upload")
            )
        );
  }

  download(uploadData): Observable<any> {
    return this.http.post(`${this.url}/upload`, uploadData)
        .pipe(
            first(),
            tap((fileName: any) => {
                localStorage.setItem("fileName", fileName);
            }),
            catchError(
                this.errorHandlerService.handleError<any>("upload")
            )
        );
  }
}