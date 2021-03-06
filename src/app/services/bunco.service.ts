import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { Rsvp } from "../models/rsvp";
import { Event } from "../models/event";
import { Config } from "../models/config";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" })
export class BuncoService {
  public url = environment.production
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

  /** POST: add an RSVP to the server */
  addRsvp(rsvp: Rsvp): Observable<Rsvp> {
    rsvp.timestamp = new Date().toLocaleString();
    return this.http.post<Rsvp>(`${this.url}/rsvp`, rsvp, httpOptions).pipe(
      tap((rsvp: Rsvp) => {
        this.log(`added rsvp w/ id=${rsvp._id}`);
        this.sendEmail(rsvp.name).subscribe();
      }),
      catchError(this.handleError<Rsvp>("addRsvp"))
    );
  }

  /** DELETE: delete all rsvps */
  deleteRsvps(): Observable<Rsvp> {
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

  /** GET the event from the server */
  getEvent(): Observable<Event> {
    return this.http.get<Event>(`${this.url}/event`, httpOptions).pipe(
      tap((event: Event) =>
        this.log(`fetched event: ${event ? event.date : event}`)
      ),
      catchError(this.handleError<Event>("getEvents"))
    );
  }

  /** POST: update an event on the server */
  updateEvent(newDate: Date): Observable<Event> {
    return this.http
      .post<Event>(`${this.url}/event`, { date: newDate }, httpOptions)
      .pipe(
        tap((event: Event) => this.log(`updated event: ${event.date}`)),
        catchError(this.handleError<Event>("updateEvent"))
      );
  }

  /** GET the config from the server */
  getConfig(): Observable<Config> {
    return this.http.get<Config>(`${this.url}/config`, httpOptions).pipe(
      tap((config: Config) =>
        this.log(`fetched config: ${config}`)
      ),
      catchError(this.handleError<Config>("getConfig"))
    );
  }

  /** POST: update the config on the server */
  updateConfig(config: Config): Observable<Config> {
    return this.http
      .post<Config>(`${this.url}/config`, config, httpOptions)
      .pipe(
        tap((config: Config) => this.log(`updated config: ${config}`)),
        catchError(this.handleError<Config>("updateConfig"))
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

  private sendEmail(name: string) {
    return this.http.post<string>(
      `${this.url}/email`,
      { name: name },
      httpOptions
    );
  }
}
