import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTableModule } from "@angular/material";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CdkTableModule } from "@angular/cdk/table";

import { RsvpTableComponent } from "./rsvp-table.component";

describe("RsvpTableComponent", () => {
  let component: RsvpTableComponent;
  let fixture: ComponentFixture<RsvpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RsvpTableComponent],
      imports: [MatTableModule, BrowserAnimationsModule, CdkTableModule],
      providers: [HttpClient, HttpHandler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
