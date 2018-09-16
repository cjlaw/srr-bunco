import { Component, OnInit } from "@angular/core";
import { BuncoService } from "../../services/bunco.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  eventDate: Date;

  constructor(private buncoService: BuncoService) {
    this.buncoService.getEvent().subscribe(event => {
      if (event) this.eventDate = event.date;
    });
  }

  ngOnInit() {}

  updateEventDate(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      if (event.value != this.eventDate) {
        this.eventDate = event.value;
        this.buncoService.updateEvent(event.value).subscribe();
      }
    }
  }

  deleteRsvps(): void {
    this.buncoService.deleteRsvps().subscribe();
  }
}
