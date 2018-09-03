import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { Rsvp } from "../models/rsvp";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" })
export class BuncoService {
  private url = environment.production
    ? `${window.location.origin}/api`
    : "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  /** GET RSVPs from the server */
  getRsvps(): Observable<Rsvp[]> {
    return this.http.get<Rsvp[]>(`${this.url}/rsvp`).pipe(
      tap(rsvps => this.log(`fetched rsvps: ${rsvps.length}`)),
      catchError(this.handleError("getRsvps", []))
    );
  }

  /** POST: add a new hero to the server */
  addRsvp(rsvp: Rsvp): Observable<Rsvp> {
    rsvp.timestamp = new Date().toLocaleString();
    return this.http.post<Rsvp>(`${this.url}/rsvp`, rsvp, httpOptions).pipe(
      tap((rsvp: Rsvp) => this.log(`added rsvp w/ id=${rsvp._id}`)),
      catchError(this.handleError<Rsvp>("addRsvp"))
    );
  }

  /** DELETE: delete all rsvps */
  deleteRsvps(rsvp: Rsvp | string): Observable<Rsvp> {
    const url = `${this.url}/rsvp-all`;

    return this.http.delete<Rsvp>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted all rsvps`)),
      catchError(this.handleError<Rsvp>("deleteRsvp"))
    );
  }

  /** DELETE: delete the rsvp by id */
  deleteRsvpById(rsvp: Rsvp | string): Observable<Rsvp> {
    const id = typeof rsvp === "string" ? rsvp : rsvp._id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Rsvp>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted rsvp id=${id}`)),
      catchError(this.handleError<Rsvp>("deleteRsvp"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
