import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  API = "http://localhost:8066";

  constructor(private http: HttpClient) {}

  // Register a new order
  public registerOrder(orderData: any) {
    return this.http.post(`${this.API}/orderdetails`, orderData); // Adjusted to match backend endpoint
  }

  // Get all orders
  public getOrders() {
    return this.http.get(`${this.API}/orderdetails`); // Adjusted to match backend endpoint
  }

  // Delete an order by ID
  public deleteOrder(orderId: number) {
    
    return this.http.delete(`${this.API}/orderdetails/${orderId}`); // Adjusted to match backend endpoint
  }

  // Update an order
  public updateOrder(order: any) {
    const orderId = order.id || order.orderId; // Ensure compatibility
    return this.http.put(`${this.API}/orderdetails/${orderId}`, order); // Adjusted to match backend endpoint
  }
}
