import { Component, Input } from '@angular/core'; 
import { ProductItem } from '../product-item/product-item';
import { NgFor } from '@angular/common';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem, NgFor],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  getQuantity(product: any): number {
    const item = this.cart.find(c => c.product.id === product.id);
    return item ? item.quantity : 0;
  }
}