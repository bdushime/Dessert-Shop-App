import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product, CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  cartService = inject(CartService);

  @Output() decrease = new EventEmitter<any>();

  @Output() confirm = new EventEmitter<void>();
  
 getTotal(): number {
  return this.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}
}