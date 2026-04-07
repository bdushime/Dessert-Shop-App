import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems = signal<any[]>([]);

  addToCart(product: any) {
    this.cartItems.update(currentItems => [...currentItems, product]);
    console.log('Item added to shared service!', product);
  }
}