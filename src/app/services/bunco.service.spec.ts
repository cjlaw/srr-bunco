import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Event } from "../models/event";
import { BuncoService } from "./bunco.service";
import { Rsvp } from "../models/rsvp";
import { Config } from "../models/config";

describe("BuncoService", () => {
  let buncoService: BuncoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuncoService]
    });

    buncoService = TestBed.get(BuncoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", inject([BuncoService], (service: BuncoService) => {
    expect(service).toBeTruthy();
  }));

  it("should successfully get RSVPs", () => {
    const dummyRsvps: Rsvp[] = [
      {
        _id: "1234",
        position: 1,
        name: "John Doe",
        timestamp: "01/01/2018"
      },
      {
        _id: "4321",
        position: 2,
        name: "Jane Doe",
        timestamp: "01/02/2018"
      }
    ];

    buncoService.getRsvps().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(dummyRsvps);
    });

    const req = httpMock.expectOne(`${buncoService.url}/rsvp`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyRsvps);

    httpMock.verify();
  });

  it("should successfully post an RSVP", () => {
    const dummyRsvp: Rsvp = {
      _id: "1234",
      position: 1,
      name: "John Doe",
      timestamp: "01/01/2018"
    };

    buncoService.addRsvp(dummyRsvp).subscribe(res => {
      expect(res).toEqual(dummyRsvp);
    });

    const req = httpMock.expectOne(`${buncoService.url}/rsvp`);
    expect(req.request.method).toBe("POST");
    req.flush(dummyRsvp);

    const req2 = httpMock.expectOne(`${buncoService.url}/email`);
    expect(req2.request.method).toBe("POST");
    req2.flush({});

    httpMock.verify();
  });

  it("should successfully get an event", () => {
    const dummyEvent: Event = {
      date: new Date()
    };

    buncoService.getEvent().subscribe(res => {
      expect(res).toEqual(dummyEvent);
    });

    const req = httpMock.expectOne(`${buncoService.url}/event`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyEvent);

    httpMock.verify();
  });

  it("should successfully update an event", () => {
    const dummyDate = new Date();
    const dummyEvent: Event = {
      date: dummyDate
    };

    buncoService.updateEvent(dummyDate).subscribe(res => {
      expect(res).toEqual(dummyEvent);
    });

    const req = httpMock.expectOne(`${buncoService.url}/event`);
    expect(req.request.method).toBe("POST");
    req.flush(dummyEvent);

    httpMock.verify();
  });

  it("should successfully get the config", () => {
    const dummyConfig: Config = {
      sendEmails: false,
      adminEmailAddress: "some@email.com"
    };

    buncoService.getConfig().subscribe(res => {
      expect(res).toEqual(dummyConfig);
    });

    const req = httpMock.expectOne(`${buncoService.url}/config`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyConfig);

    httpMock.verify();
  });

  it("should successfully update the config", () => {
    const dummyConfig: Config = {
      sendEmails: false,
      adminEmailAddress: "new@email.com"
    };

    buncoService.updateConfig(dummyConfig).subscribe(res => {
      expect(res).toEqual(dummyConfig);
    });

    const req = httpMock.expectOne(`${buncoService.url}/config`);
    expect(req.request.method).toBe("POST");
    req.flush(dummyConfig);

    httpMock.verify();
  });
});
