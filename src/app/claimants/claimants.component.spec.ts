import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimantsComponent } from './claimants.component';

describe('ClaimantsComponent', () => {
  let component: ClaimantsComponent;
  let fixture: ComponentFixture<ClaimantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
