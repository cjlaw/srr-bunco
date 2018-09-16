import { Component, OnInit } from "@angular/core";
import { Rsvp } from "../../models/rsvp";
import { BuncoService } from "../../services/bunco.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private buncoService: BuncoService) {}
  rsvpSubject = new Subject<Rsvp>();
  rsvpList: Rsvp[];
  eventDateSubject = new Subject<Date>();
  eventDate: Date;

  ngOnInit() {
    this.fetchRsvps();
    this.fetchEvent();
    this.rsvpSubject.subscribe(() => this.fetchRsvps());
    this.eventDateSubject.subscribe(() => this.fetchEvent());
  }

  fetchRsvps(): void {
    this.buncoService.getRsvps().subscribe(rsvps => (this.rsvpList = rsvps));
  }

  fetchEvent(): void {
    this.buncoService.getEvent().subscribe(event => {
      if (event) this.eventDate = event.date;
    });
  }
}
