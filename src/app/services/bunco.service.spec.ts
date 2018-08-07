import { TestBed, inject } from "@angular/core/testing";

import { BuncoService } from "./bunco.service";

describe("BuncoService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuncoService]
    });
  });

  it("should be created", inject([BuncoService], (service: BuncoService) => {
    expect(service).toBeTruthy();
  }));
});
