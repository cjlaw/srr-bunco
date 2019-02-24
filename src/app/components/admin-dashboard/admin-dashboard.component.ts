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
  sendEmails: boolean;
  adminEmailAddress: string;

  constructor(private buncoService: BuncoService) {
    this.buncoService.getEvent().subscribe(event => {
      if (event) this.eventDate = event.date;
    });

    this.buncoService.getConfig().subscribe(config => {
      if (config) {
        this.adminEmailAddress = config.adminEmailAddress;
        this.sendEmails = config.sendEmails;
      }
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

  setAdminEmail(): void {
    this.buncoService.updateConfig({ sendEmails: this.sendEmails, adminEmailAddress: this.adminEmailAddress}).subscribe();
  }

  handleSendEmailChange(): void {
    this.adminEmailAddress = this.sendEmails ? this.adminEmailAddress : "";
    this.buncoService.updateConfig({ sendEmails: this.sendEmails, adminEmailAddress: this.adminEmailAddress }).subscribe(config => {
      if (config) {
        this.adminEmailAddress = config.adminEmailAddress;
        this.sendEmails = config.sendEmails;
      }
    });
  }
}
