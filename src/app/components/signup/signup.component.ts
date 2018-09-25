import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Rsvp } from "../../models/rsvp";
import { BuncoService } from "../../services/bunco.service";
import { Subject } from "rxjs";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  @Input()
  public data: Subject<Rsvp>;
  constructor(private buncoService: BuncoService) {}
  rsvp: Rsvp;
  entrySubmitted: boolean;
  eventDate: Date;
  eventDateSubject = new Subject<Date>();

  nameFormControl = new FormControl("", []);
  matcher = new MyErrorStateMatcher();

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
    if (name.trim().length > 0) {
      this.entrySubmitted = localStorage.getItem("entrySubmitted") === "true";
      if (!this.entrySubmitted) {
        this.buncoService.addRsvp({ name } as Rsvp).subscribe(rsvp => {
          this.data.next(rsvp);
          localStorage.setItem("entrySubmitted", "true");
          localStorage.setItem("eventDate", this.eventDate.toString());
        });
      } else {
        this.nameFormControl.setErrors({ alreadySubmitted: true });
      }
    }
  }
}
