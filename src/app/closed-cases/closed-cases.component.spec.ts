import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedCasesComponent } from './closed-cases.component';

describe('ClosedCasesComponent', () => {
  let component: ClosedCasesComponent;
  let fixture: ComponentFixture<ClosedCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
