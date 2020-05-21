import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWitnessComponent } from './my-witness.component';

describe('MyWitnessComponent', () => {
  let component: MyWitnessComponent;
  let fixture: ComponentFixture<MyWitnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWitnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
