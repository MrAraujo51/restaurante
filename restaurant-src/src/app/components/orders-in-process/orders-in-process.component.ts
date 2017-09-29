import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-orders-in-process',
  templateUrl: './orders-in-process.component.html',
  styleUrls: ['./orders-in-process.component.css']
})
export class OrdersInProcessComponent implements OnInit {

  inPogressOrders;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getAllInProcessOrders();
  }
  getAllInProcessOrders() {
    this.orderService.getAllInProcessOrders().subscribe( data => {
      if (data.success) {
        this.inPogressOrders = data.orders;
      } else {
      }
    });
  }

  isDone(order_id) {
    const order = {
      order_id: order_id
    };
    this.orderService.isDone(order).subscribe(data => {
      if (data.success) {
        this.getAllInProcessOrders();
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

}
