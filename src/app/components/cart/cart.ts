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

  trackByItem(index: number, item: CartItem): number {
    return item.product.id;
  }
}