import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseApplicationComponent } from './case-application.component';

describe('CaseApplicationComponent', () => {
  let component: CaseApplicationComponent;
  let fixture: ComponentFixture<CaseApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
