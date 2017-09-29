import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersInProcessComponent } from './orders-in-process.component';

describe('OrdersInProcessComponent', () => {
  let component: OrdersInProcessComponent;
  let fixture: ComponentFixture<OrdersInProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersInProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
