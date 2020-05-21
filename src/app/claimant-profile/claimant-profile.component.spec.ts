import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimantProfileComponent } from './claimant-profile.component';

describe('ClaimantProfileComponent', () => {
  let component: ClaimantProfileComponent;
  let fixture: ComponentFixture<ClaimantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
