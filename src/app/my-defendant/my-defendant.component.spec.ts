import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDefendantComponent } from './my-defendant.component';

describe('MyDefendantComponent', () => {
  let component: MyDefendantComponent;
  let fixture: ComponentFixture<MyDefendantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDefendantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDefendantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
