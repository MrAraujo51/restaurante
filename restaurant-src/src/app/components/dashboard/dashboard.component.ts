import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrderService } from '../../service/order.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registerOrderForm: FormGroup;
  items: any = [];
  messageClass;
  message;
  hiddenOrderModal;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.registerOrderForm = this.formBuilder.group({
      cname: [null, Validators.required],
      payMethod: [null, Validators.required],
      dishes: this.formBuilder.array([ this.createItem() ])
    });
  }

  createItem() {
    return this.formBuilder.group({
      plate: '',
      price: ''
    });
  }

  addItem(): void {
    this.items = this.registerOrderForm.get('dishes') as FormArray;
    this.items.push(this.createItem());
  }

  onRegisterOrden() {

    console.log( this.registerOrderForm.controls.dishes);
    // const orden = {
    //   cname: this.registerOrderForm.get('cname'),
    //   payMethod: this.registerOrderForm.get('payMethod'),
    //   orderDetail: this.registerOrderForm.get('dishes')
    // };

    // this.orderService.registerOrder(orden).subscribe( data => {
    //   if (data.success) {
    //     this.messageClass = 'alert alert-success'; // Set bootstrap success class
    //     this.message = data.message; // Set success message
    //   } else {
    //     this.messageClass = 'alert alert-danger'; // Set bootstrap error class
    //     this.message = data.message; // Set error message
    //   }
    // });
  }
}
