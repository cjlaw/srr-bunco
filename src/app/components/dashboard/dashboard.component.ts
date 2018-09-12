import { Component, OnInit } from "@angular/core";
import { Rsvp } from "../../models/rsvp";
import { BuncoService } from "../../services/bunco.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private buncoService: BuncoService) {}
  rsvpSubject = new Subject<Rsvp>();
  rsvpList: Rsvp[];
  dateObj: Date;

  ngOnInit() {
    this.fetchRsvps();
    this.rsvpSubject.subscribe(() => this.fetchRsvps());
    this.dateObj = new Date();
  }

  fetchRsvps(): void {
    this.buncoService.getRsvps().subscribe(rsvps => (this.rsvpList = rsvps));
  }
}
