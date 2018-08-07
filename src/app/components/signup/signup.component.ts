import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Rsvp } from "../../models/rsvp";
import { BuncoService } from "../../services/bunco.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  @Input() public rsvpStream: Subject<Rsvp>;
  constructor(private buncoService: BuncoService) {}
  rsvp: Rsvp;

  ngOnInit() {
    this.rsvp = new Rsvp();
  }

  submitRsvp(name: string): void {
    this.buncoService.addRsvp({ name } as Rsvp).subscribe(rsvp => {
      this.rsvpStream.next(rsvp);
    });
  }
}
