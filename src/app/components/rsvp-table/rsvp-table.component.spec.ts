import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpTableComponent } from './rsvp-table.component';

describe('RsvpTableComponent', () => {
  let component: RsvpTableComponent;
  let fixture: ComponentFixture<RsvpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
