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

  delete(photoID): Observable<any> {
    console.log(photoID)
    return this.http.post(`${this.url}/delete`, photoID)
        .pipe(first(),
            catchError(
                this.errorHandlerService.handleError<any>("upload")
            )
        );
  }

  display(id): Observable<any> {
    return this.http.post(`${this.url}/display`, id)
        .pipe(
            first(),
            tap((displayed: any) => {
                localStorage.setItem("photoID", displayed.photoId)
                localStorage.setItem("photo", displayed.photo);
                localStorage.setItem("geolocation", displayed.geolocation);
                localStorage.setItem("tags", displayed.tags);
                localStorage.setItem("capturedDate", displayed.capturedDate);
                localStorage.setItem("capturedBy", displayed.capturedBy);
            }),
            catchError(
                this.errorHandlerService.handleError<any>("upload")
            )
        );
  }

  update(newData): Observable<any> {
    return this.http.post(`${this.url}/update`, newData)
        .pipe(
            first(),
            catchError(
                this.errorHandlerService.handleError<any>("upload")
            )
        );
  }
}