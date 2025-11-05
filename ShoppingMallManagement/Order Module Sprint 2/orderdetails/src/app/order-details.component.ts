import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetailsService } from './order-details.service';

@Component({
  selector: 'app-order-details-root',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {
  title = 'orderdetails';

  constructor(private orderService: OrderDetailsService) {}

  orderDetails: any[] = [];
  filteredOrderDetails: any[] = [];
  orderToUpdate = {
    id: null,
    customerName: '',
    product: '',
    quantity: 0,
    description: ''
  };
  sortColumn: string = 'orderId';
  sortDirection: 'asc' | 'desc' = 'asc';
  filterValue: string = '';

  ngOnInit(): void {
    this.getOrderDetails();

    // Add mouse tracking
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    });
  }

  ngAfterViewInit(): void {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found!');
      return;
    }

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Mouse object
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 100 // Reduced radius for more subtle interaction
    };

    // Mouse move event listener
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      vx: number; // velocity x
      vy: number; // velocity y

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = 1.5; // Smaller particles
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 5; // Lower density
        this.color = color;
        this.vx = (Math.random() - 0.5) * 0.5; // random velocity
        this.vy = (Math.random() - 0.5) * 0.5; // random velocity
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // floating animation
        this.x += this.vx;
        this.y += this.vy;

        // bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.vx *= -1;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.vy *= -1;
        }

        if (mouse.x === null || mouse.y === null) {
          return;
        }
        // mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // return to base position is not needed anymore with the floating animation
        }
      }
    }

    // Particle array
    let particles: Particle[] = [];

    // Create particles
    function init() {
      particles = [];
      const colors = ['#ff8c00', '#ff00d4', '#00f2ff', '#007bff'];
      const numberOfParticles = 1000; // More particles
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    }

    // Initialize and start animation
    init();
    animate();

    // Resize event listener
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });
  }

  getOrderDetails(): void {
    this.orderService.getOrders().subscribe(
      (response: any) => {
        console.log('Fetched orders:', response);
        if (Array.isArray(response)) {
          this.orderDetails = response.map(order => ({
            ...order,
            id: order.id || order.orderId
          }));
          this.applyFilterAndSort();
        } else {
          console.error('Unexpected response structure:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  applyFilterAndSort(): void {
    // 1. Filter
    this.filteredOrderDetails = this.orderDetails.filter(order =>
      (order.customerName && order.customerName.toLowerCase().includes(this.filterValue.toLowerCase())) ||
      (order.product && order.product.toLowerCase().includes(this.filterValue.toLowerCase()))
    );

    // 2. Sort
    if (this.sortColumn) {
      this.filteredOrderDetails.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
        if (aValue < bValue) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilterAndSort();
  }

  onFilterChange(): void {
    this.applyFilterAndSort();
  }

  // Register a new order
  register(registerForm: NgForm): void {
    this.orderService.registerOrder(registerForm.value).subscribe(
      (response: any) => {
        console.log('Order registered:', response);
        registerForm.reset();
        this.getOrderDetails();
      },
      (error: any) => {
        console.error('Error registering order:', error);
      }
    );
  }

  // Delete an order
  deleteOrder(order: any): void {
    if (!order.id) {
      console.error('Order ID is undefined. Cannot delete order.');
      return;
    }
    console.log('Deleting order with ID:', order.id);
    this.orderService.deleteOrder(order.id).subscribe(
      (response: any) => {
        console.log('Order deleted:', response);
        this.getOrderDetails();
      },
      (error: any) => {
        console.error('Error deleting order:', error);
      }
    );
  }

  // Edit an order
  edit(order: any): void {
    this.orderToUpdate = { ...order };
  }

  // Update an order
  updateOrder(): void {
    this.orderService.updateOrder(this.orderToUpdate).subscribe(
      (response: any) => {
        console.log('Order updated:', response);
        this.getOrderDetails();
      },
      (error: any) => {
        console.error('Error updating order:', error);
      }
    );
  }
}
