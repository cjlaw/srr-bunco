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
  styleUrls: ["./rsvp-table.component.scss"]
})
export class RsvpTableComponent implements OnInit {
  @Input() data: Rsvp[];
  dataSource: Rsvp[];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSource = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = changes.data.currentValue;
    this.dataSource = this.data;
    this.changeDetector.detectChanges();
  }

  displayedColumns: string[] = ["position", "name", "timestamp"];
}
