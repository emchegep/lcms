import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCaseComponent } from './my-case.component';

describe('MyCaseComponent', () => {
  let component: MyCaseComponent;
  let fixture: ComponentFixture<MyCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
