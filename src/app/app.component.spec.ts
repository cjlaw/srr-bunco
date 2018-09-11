import { TestBed, async, inject } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { AppComponent } from "./app.component";
describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, DashboardComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });
  }));
  it(`should have as title 'bunco'`, async(() => {
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual("bunco");
    });
  }));
  it("should render title in a h1 tag", async(() => {
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector("h1").textContent).toContain(
        "Welcome to bunco!"
      );
    });
  }));
});
