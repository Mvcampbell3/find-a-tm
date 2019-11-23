import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeModalComponent } from './first-time-modal.component';

describe('FirstTimeModalComponent', () => {
  let component: FirstTimeModalComponent;
  let fixture: ComponentFixture<FirstTimeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
