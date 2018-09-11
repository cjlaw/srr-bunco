import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatInputModule, MatButtonModule } from "@angular/material";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SignupComponent } from "./signup.component";

describe("SignupComponent", () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [MatInputModule, MatButtonModule, BrowserAnimationsModule],
      providers: [HttpClient, HttpHandler]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
