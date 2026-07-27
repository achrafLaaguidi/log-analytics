import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPopups } from './status-popups';

describe('StatusPopups', () => {
  let component: StatusPopups;
  let fixture: ComponentFixture<StatusPopups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusPopups],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusPopups);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
