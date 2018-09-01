import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ChangeDetectorRef
} from "@angular/core";
import { Rsvp } from "../../models/rsvp";

@Component({
  selector: "app-rsvp-table",
  templateUrl: "./rsvp-table.component.html",
  styleUrls: ["./rsvp-table.component.css"]
})
export class RsvpTableComponent implements OnInit {
  @Input()
  rsvps: Rsvp[];
  dataSource: Rsvp[];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSource = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rsvps = changes.rsvps.currentValue;
    this.dataSource = this.rsvps;
    this.changeDetector.detectChanges();
  }

  displayedColumns: string[] = ["position", "name", "timestamp"];
}
