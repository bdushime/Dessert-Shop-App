import { Injectable, inject } from '@angular/core';
import { LoggerService } from './logger.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private logger = inject(LoggerService);
  private utils = inject(UtilityService);
  
  items: any[] = [];

  constructor() {
    this.loadCart();
  }

  addToCart(product: any) {
    const existingItem = this.items.find(item => item.product.name === product.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product: product, quantity: 1 });
    }
    
    this.logger.log(`Added ${product.name} to cart.`);
    this.saveCart();
  }

  decreaseQuantity(item: any) {
    const existingItem = this.items.find(c => c.product.name === item.product.name);
    if (!existingItem) return;

    if (existingItem.quantity > 1) {
      existingItem.quantity--;
      this.logger.log(`Decreased quantity of ${item.product.name}.`);
    } else {
      this.removeItem(item);
      return; // removeItem calls saveCart already
    }
    this.saveCart();
  }

  removeItem(item: any) {
    this.items = this.items.filter(c => c.product.name !== item.product.name);
    this.logger.log(`Removed ${item.product.name} from cart.`);
    this.saveCart();
  }

  getQuantity(product: any): number {
    const item = this.items.find(c => c.product.name === product.name);
    return item ? item.quantity : 0;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + this.utils.calculateSubtotal(item.product.price, item.quantity), 0);
  }

  
  private saveCart() {
    localStorage.setItem('dessert-cart', JSON.stringify(this.items));
  }

  private loadCart() {
    const savedCart = localStorage.getItem('dessert-cart');
    if (savedCart) {
      try {
        this.items = JSON.parse(savedCart);
        this.logger.log('Restored cart from local storage.');
      } catch (e) {
        this.logger.error('Failed to parse cart from local storage.');
      }
    }
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('dessert-cart');
    this.logger.log('Cart completely cleared.');
  }
}
