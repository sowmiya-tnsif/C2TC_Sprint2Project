import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OrderDetailsService } from './order-details.service';

describe('OrderDetailsService', () => {
  let service: OrderDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderDetailsService],
    });
    service = TestBed.inject(OrderDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve orders from the API via GET', () => {
    const dummyOrders = [
      { orderId: 1, name: 'Order 1' },
      { orderId: 2, name: 'Order 2' },
    ];

    service.getOrders().subscribe((orders) => {
      expect(orders).toEqual(dummyOrders);
    });

    const req = httpMock.expectOne(`${service.API}/orderdetails`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrders);
  });

  it('should add an order via POST', () => {
    const newOrder = { name: 'Order 3' };

    service.registerOrder(newOrder).subscribe((order) => {
      expect(order).toEqual(newOrder);
    });

    const req = httpMock.expectOne(`${service.API}/orderdetails`);
    expect(req.request.method).toBe('POST');
    req.flush(newOrder);
  });

  it('should delete an order via DELETE', () => {
    const orderId = 1;

    service.deleteOrder(orderId).subscribe();

    const req = httpMock.expectOne(`${service.API}/orderdetails/${orderId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update an order via PUT', () => {
    const updatedOrder = { orderId: 1, name: 'Updated Order 1' };

    service.updateOrder(updatedOrder).subscribe((order) => {
      expect(order).toEqual(updatedOrder);
    });

    const req = httpMock.expectOne(
      `${service.API}/orderdetails/${updatedOrder.orderId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedOrder);
  });
});