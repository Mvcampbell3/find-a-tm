import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListplayersComponent } from './listplayers.component';

describe('ListplayersComponent', () => {
  let component: ListplayersComponent;
  let fixture: ComponentFixture<ListplayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListplayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
