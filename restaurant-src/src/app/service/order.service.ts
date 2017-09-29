import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class OrderService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

   // Function to create headers, add token, to be used in HTTP requests
   createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  registerOrder(order) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'api/order/register', order, this.options)
      .map(res => res.json());
  }

  getAllPendingOrders() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'api/orders/pending', this.options)
      .map(res => res.json());
  }
  getAllInProcessOrders() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'api/orders/in-process', this.options)
    .map(res => res.json());
  }

  getAllDoneOrders() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'api/orders/done', this.options)
      .map(res => res.json());
  }

  isInProcess(order_id) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'api/orders/is-in-process', order_id, this.options)
      .map(res => res.json());
  }

  isDone(order_id) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'api/orders/is-done', order_id, this.options)
      .map(res => res.json());
  }

}
