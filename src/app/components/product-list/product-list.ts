import { Component, inject, Input, Output, EventEmitter } from '@angular/core'; 
import { CartService } from '../../services/cart'; 
import {ProductItem} from '../product-item/product-item';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-product-list',
  imports:[ProductItem,NgFor],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  
  @Input() products: any[] = [];
  @Input() cart: any[] = [];

  @Output() addToCart = new EventEmitter<any>();
  @Output() decrease = new EventEmitter<any>();

  onAddToCart(product: any){
    this.addToCart.emit(product);
  }

  onDecrease(product: any) {
    this.decrease.emit({ product }); // wrap in object so it matches item.product in decreaseQuantity
  }

  getQuantity(product: any): number {
    const item = this.cart.find(c => c.product.name === product.name);
    return item ? item.quantity : 0;
  }
}