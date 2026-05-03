import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
  standalone: true
})
export class ProductItem {
  @Input() product!: Product;
  

  cartService = inject(CartService);

  get quantity(): number {
    return this.cartService.getQuantity(this.product);
  }
}
