import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrderService } from '../../service/order.service';
@Component({
  selector: 'app-orders-pending',
  templateUrl: './orders-pending.component.html',
  styleUrls: ['./orders-pending.component.css']
})
export class OrdersPendingComponent implements OnInit {

  registerOrderForm: FormGroup;
  items: any = [];
  messageClass;
  message;
  hiddenOrderModal;
  pendingOrders;
  totalAmount;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) {
    this.createForm();
    this.getAllPendingOrders();
   }

  ngOnInit() {
  }

  createForm() {
    this.registerOrderForm = this.formBuilder.group({
      cname: [null, Validators.required],
      payMethod: [null, Validators.required],
      dishes: this.formBuilder.array([ this.createItem() ])
    });
    this.items = this.registerOrderForm.get('dishes') as FormArray;
  }

  createItem() {
    return this.formBuilder.group({
      plate: ['', Validators.required],
      price: [0, Validators.required]
    });
  }

  addItem(): void {
    this.items = this.registerOrderForm.get('dishes') as FormArray;
    this.items.push(this.createItem());
    this.onTotalAmount();
  }

  onRegisterOrden() {
    const orden = {
      cname: this.registerOrderForm.get('cname').value,
      payMethod: this.registerOrderForm.get('payMethod').value,
      orderDetail: this.registerOrderForm.get('dishes').value,
      totalAmount: this.totalAmount
    };

    this.orderService.registerOrder(orden).subscribe( data => {
      if (data.success) {
        this.closeBtn.nativeElement.click();  // Close Modal
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message; // Set success message
        this.createForm();
        this.getAllPendingOrders();
      } else {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      }
    });
  }

  getAllPendingOrders() {
    this.orderService.getAllPendingOrders().subscribe( data => {
      if (data.success) {
        this.pendingOrders = data.orders;
      } else {
      }
    });
  }

  isInProcess(order_id) {
    const order = {
      order_id: order_id
    };
    this.orderService.isInProcess(order).subscribe(data => {
      if (data.success) {
        this.getAllPendingOrders();
      }
    });
  }

  timeSince(date) {
    const seconds = Math.floor((new Date().getTime() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `Posted ${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `Posted ${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `Posted ${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `Posted ${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `Posted ${interval} minutes ago`;
    }
    return`Posted ${Math.floor(seconds)} seconds ago`;
  }

  onTotalAmount() {
    let aux = 0;
    this.items.value.forEach(item => {
      aux += item.price;
    });
    this.totalAmount = aux;
  }



}
