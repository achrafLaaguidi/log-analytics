import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmToast } from './confirm-toast';

describe('ConfirmToast', () => {
  let component: ConfirmToast;
  let fixture: ComponentFixture<ConfirmToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmToast],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmToast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
