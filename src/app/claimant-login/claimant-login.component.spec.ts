import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimantLoginComponent } from './claimant-login.component';

describe('ClaimantLoginComponent', () => {
  let component: ClaimantLoginComponent;
  let fixture: ComponentFixture<ClaimantLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimantLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
