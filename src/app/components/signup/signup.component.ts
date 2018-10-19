import { Component, OnInit, Input } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Rsvp } from "../../models/rsvp";
import { BuncoService } from "../../services/bunco.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  constructor(private buncoService: BuncoService) {}

  @Input()
  public data: Subject<Rsvp>;

  rsvp: Rsvp;
  entrySubmitted: boolean;
  eventDate: Date;
  eventDateSubject = new Subject<Date>();

  nameFormControl = new FormControl("", [
    Validators.required,
    this.singleSubmissionValidator
  ]);

  singleSubmissionValidator() {
    if (localStorage.getItem("entrySubmitted") === "true") {
      return { alreadySubmitted: true };
    }
    return null;
  }

  ngOnInit() {
    this.fetchEvent();
    this.eventDateSubject.subscribe(() => this.fetchEvent());
    this.rsvp = new Rsvp();
  }

  fetchEvent(): void {
    this.buncoService.getEvent().subscribe(event => {
      if (event) this.eventDate = event.date;

      // Compare dates to see if entrySubmitted property needs to be reset
      let storedEventDate = localStorage.getItem("eventDate");
      if (storedEventDate && this.eventDate.toString() != storedEventDate) {
        localStorage.removeItem("entrySubmitted");
      }

      this.entrySubmitted = localStorage.getItem("entrySubmitted") === "true";
    });
  }

  submitRsvp(name: string): void {
    if (this.nameFormControl.untouched) {
      this.nameFormControl.markAsTouched();
      return;
    }
    if (this.nameFormControl.valid) {
      this.buncoService.addRsvp({ name } as Rsvp).subscribe(rsvp => {
        this.data.next(rsvp);
        localStorage.setItem("entrySubmitted", "true");
        localStorage.setItem("eventDate", this.eventDate.toString());
      });
    }
  }
}
