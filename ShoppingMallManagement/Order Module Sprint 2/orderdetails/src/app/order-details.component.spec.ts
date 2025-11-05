import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailsComponent } from './order-details.component';
import { OrderDetailsService } from './order-details.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let orderDetailsService: OrderDetailsService;

  const mockOrderDetails = [
    { customerName: 'John Doe', product: 'Product A', quantity: 10, id: 1, description: 'Test order 1' },
    { customerName: 'Jane Doe', product: 'Product B', quantity: 5, id: 2, description: 'Test order 2' },
    { customerName: 'Peter Pan', product: 'Product C', quantity: 15, id: 3, description: 'Test order 3' },
  ];

  let mockService: any;

  beforeEach(async () => {
    mockService = {
      getOrders: () => of(mockOrderDetails),
      registerOrder: (order: any) => of({ ...order, orderId: 4, id: 4 }),
      deleteOrder: (orderId: number) => of({}),
      updateOrder: (order: any) => of(order),
    };
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: OrderDetailsService,
          useValue: {
            getOrders: () => of(mockOrderDetails),
            registerOrder: (order: any) => of({ ...order, orderId: 4, id: 4 }),
            deleteOrder: (orderId: number) => of({}),
            updateOrder: (order: any) => of(order),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    orderDetailsService = TestBed.inject(OrderDetailsService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'orderdetails'`, () => {
    expect(component.title).toEqual('orderdetails');
  });

  it('should fetch order details on init', () => {
    spyOn(orderDetailsService, 'getOrders').and.callThrough();
    component.ngOnInit();
    expect(orderDetailsService.getOrders).toHaveBeenCalled();
    expect(component.orderDetails.length).toBe(3);
    expect(component.filteredOrderDetails.length).toBe(3);
  });

  it('should sort the order details', () => {
    component.sort('customerName');
    expect(component.filteredOrderDetails[0].customerName).toBe('Jane Doe');
    component.sort('customerName');
    expect(component.filteredOrderDetails[0].customerName).toBe('Peter Pan');
  });

  it('should filter the order details', () => {
    component.filterValue = 'jane';
    component.onFilterChange();
    expect(component.filteredOrderDetails.length).toBe(1);
    expect(component.filteredOrderDetails[0].customerName).toBe('Jane Doe');
  });

  it('should delete an order', () => {
    spyOn(orderDetailsService, 'deleteOrder').and.callThrough();
    spyOn(component, 'getOrderDetails').and.callThrough();
    const orderToDelete = component.orderDetails[0];
    component.deleteOrder(orderToDelete);
    expect(orderDetailsService.deleteOrder).toHaveBeenCalledWith(orderToDelete.id);
    expect(component.getOrderDetails).toHaveBeenCalled();
  });

  it('should set the order to update on edit', () => {
    const orderToEdit = component.orderDetails[0];
    component.edit(orderToEdit);
    expect(component.orderToUpdate).toEqual(orderToEdit);
  });

  it('should update an order', () => {
    spyOn(orderDetailsService, 'updateOrder').and.callThrough();
    spyOn(component, 'getOrderDetails').and.callThrough();
    const orderToUpdate = {
      id: null,
      customerName: 'John Doe Updated',
      product: 'Product A',
      quantity: 12,
      description: 'Updated order description'
    };
    component.orderToUpdate = orderToUpdate;
    component.updateOrder();
    expect(orderDetailsService.updateOrder).toHaveBeenCalledWith({...orderToUpdate, id: 1});
    expect(component.getOrderDetails).toHaveBeenCalled();
  });

  it('should handle update order error', () => {
    const errorMessage = 'Update failed';
    spyOn(orderDetailsService, 'updateOrder').and.returnValue(throwError(() => new Error(errorMessage)));
    spyOn(console, 'error');
    
    const orderToUpdate = {
      id: null,
      customerName: 'John Doe Updated',
      product: 'Product A',
      quantity: 12,
      description: 'Test description'
    };
    component.orderToUpdate = orderToUpdate;
    component.updateOrder();
    
    expect(console.error).toHaveBeenCalled();
  });

  it('should register a new order', () => {
    spyOn(orderDetailsService, 'registerOrder').and.callThrough();
    spyOn(component, 'getOrderDetails').and.callThrough();
    const newOrder = {
      customerName: 'New Customer',
      product: 'New Product',
      quantity: 1,
      description: 'New order description'
    };
    const form = { value: newOrder, reset: () => {} } as any;
    spyOn(form, 'reset');
    component.register(form);
    expect(orderDetailsService.registerOrder).toHaveBeenCalledWith(newOrder);
    expect(form.reset).toHaveBeenCalled();
    expect(component.getOrderDetails).toHaveBeenCalled();
  });

  it('should handle register order error', () => {
    const errorMessage = 'Registration failed';
    spyOn(orderDetailsService, 'registerOrder').and.returnValue(throwError(() => new Error(errorMessage)));
    spyOn(console, 'error');
    
    const newOrder = {
      customerName: 'New Customer',
      product: 'New Product',
      quantity: 1,
      description: 'New order description'
    };
    const form = { value: newOrder, reset: () => {} } as any;
    component.register(form);
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle invalid form submission', () => {
    const invalidForm = {
      value: {},
      valid: false,
      reset: () => {}
    } as any;
    component.register(invalidForm);
    expect(orderDetailsService.registerOrder).not.toHaveBeenCalled();
  });

  it('should validate quantity is positive', () => {
    const invalidOrder = {
      customerName: 'Test Customer',
      product: 'Test Product',
      quantity: -1,
      description: 'Test description'
    };
    const form = { value: invalidOrder, reset: () => {} } as any;
    component.register(form);
    expect(orderDetailsService.registerOrder).not.toHaveBeenCalled();
  });

  it('should clear orderToUpdate after successful update', () => {
    const orderToUpdate = {
      id: null,
      customerName: 'Test Update',
      product: 'Test Product',
      quantity: 1,
      description: 'Test description'
    };
    component.orderToUpdate = orderToUpdate;
    component.updateOrder();
    expect(component.orderToUpdate).toEqual({
      id: null,
      customerName: '',
      product: '',
      quantity: 0,
      description: ''
    });
  });
});