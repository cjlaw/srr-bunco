import { TestBed, inject } from "@angular/core/testing";
import { HttpClient, HttpHandler } from "@angular/common/http";

import { BuncoService } from "./bunco.service";

describe("BuncoService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuncoService, HttpClient, HttpHandler]
    });
  });

  it("should be created", inject([BuncoService], (service: BuncoService) => {
    expect(service).toBeTruthy();
  }));
});
