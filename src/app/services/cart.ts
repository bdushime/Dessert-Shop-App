import { Injectable } from '@angular/core';
import { Product, CartItem } from '../app';
import data from '../../data.json'


@Injectable({
  providedIn: 'root' 
})
export class CartService {
  products: Product[] = data;
  cart: CartItem[] = [];
  confirmedItems: CartItem[] = [];
  showConfirmation = false;

  addToCart(product: Product) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  decreaseQuantity(product: Product) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (!existingItem) return;

    if (existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      this.removeItem(product);
    }
  }

  removeItem(product: Product) {
    this.cart = this.cart.filter(item => item.product.id !== product.id);
  }

  getQuantity(product: Product): number {
    const item = this.cart.find(i => i.product.id === product.id);
    return item ? item.quantity : 0;
  }

  confirmOrder() {
    this.confirmedItems = this.cart.map(item => ({ ...item }));
    this.showConfirmation = true;
  }

  getConfirmedTotal(): number {
    return this.confirmedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  startNewOrder() {
    this.cart = [];
    this.confirmedItems = [];
    this.showConfirmation = false;
  }
}