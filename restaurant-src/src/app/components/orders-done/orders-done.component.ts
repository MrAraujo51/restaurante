import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-orders-done',
  templateUrl: './orders-done.component.html',
  styleUrls: ['./orders-done.component.css']
})
export class OrdersDoneComponent implements OnInit {
  doneOrders;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getAllDoneOrders();
  }
  getAllDoneOrders() {
    this.orderService.getAllDoneOrders().subscribe(data => {
      if (data.success) {
        this.doneOrders = data.orders;
      } else {
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
