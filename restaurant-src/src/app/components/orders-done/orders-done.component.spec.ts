import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDoneComponent } from './orders-done.component';

describe('OrdersDoneComponent', () => {
  let component: OrdersDoneComponent;
  let fixture: ComponentFixture<OrdersDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
