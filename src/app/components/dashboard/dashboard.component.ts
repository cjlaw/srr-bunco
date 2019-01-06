import { Component, OnInit } from "@angular/core";
import { Rsvp } from "../../models/rsvp";
import { BuncoService } from "../../services/bunco.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private buncoService: BuncoService) {}

  rsvpList: Rsvp[];
  eventDate: Date;
  entrySubmitted: boolean;

  ngOnInit() {
    this.fetchRsvps();
    this.fetchEvent();
  }

  fetchRsvps(): void {
    this.buncoService.getRsvps().subscribe(rsvps => (this.rsvpList = rsvps));
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
    this.buncoService.addRsvp({ name } as Rsvp).subscribe(() => {
      localStorage.setItem("entrySubmitted", "true");
      localStorage.setItem("eventDate", this.eventDate.toString());

      this.fetchRsvps();
    });
  }
}
