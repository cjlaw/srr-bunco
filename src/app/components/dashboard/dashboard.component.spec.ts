import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatInputModule,
  MatTableModule,
  MatButtonModule
} from "@angular/material";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CdkTableModule } from "@angular/cdk/table";
import { DashboardComponent } from "./dashboard.component";
import { SignupComponent } from "../signup/signup.component";
import { RsvpTableComponent } from "../rsvp-table/rsvp-table.component";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, SignupComponent, RsvpTableComponent],
      imports: [
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        CdkTableModule,
        BrowserAnimationsModule
      ],
      providers: [HttpClient, HttpHandler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
