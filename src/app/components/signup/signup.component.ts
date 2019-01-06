import { Component, Input, EventEmitter, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent {
  constructor() {}

  @Input()
  eventDate: Date;

  @Input()
  entrySubmitted: boolean;

  @Output()
  rsvpSubmitted = new EventEmitter<string>();

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

  submitRsvp(name: string): void {
    if (this.nameFormControl.untouched) {
      this.nameFormControl.markAsTouched();
    }
    if (this.nameFormControl.valid) {
      this.rsvpSubmitted.emit(name);
    }
  }
}
