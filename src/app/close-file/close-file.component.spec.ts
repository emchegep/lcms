import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseFileComponent } from './close-file.component';

describe('CloseFileComponent', () => {
  let component: CloseFileComponent;
  let fixture: ComponentFixture<CloseFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
