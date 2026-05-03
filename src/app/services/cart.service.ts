import { Injectable, inject } from '@angular/core';
import { LoggerService } from './logger.service';
import { UtilityService } from './utility.service';
import { Product, CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private logger = inject(LoggerService);
  private utils = inject(UtilityService);
  
  items: CartItem[] = [];


  showConfirmation = false;
  confirmedItems: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  addToCart(product: Product) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product: product, quantity: 1 });
    }
    
    this.logger.log(`Added ${product.name} to cart.`);
    this.saveCart();
  }

  decreaseQuantity(product: Product) {
    const existingItem = this.items.find(c => c.product.id === product.id);
    if (!existingItem) return;

    if (existingItem.quantity > 1) {
      existingItem.quantity--;
      this.logger.log(`Decreased quantity of ${product.name}.`);
    } else {
      this.removeItem(product);
      return; 
    }
    this.saveCart();
  }

  removeItem(product: Product) {
    this.items = this.items.filter(c => c.product.id !== product.id);
    this.logger.log(`Removed ${product.name} from cart.`);
    this.saveCart();
  }

  getQuantity(product: Product): number {
    const item = this.items.find(c => c.product.id === product.id);
    return item ? item.quantity : 0;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + this.utils.calculateSubtotal(item.product.price, item.quantity), 0);
  }

  confirmOrder() {
    
    this.confirmedItems = this.items.map(item => ({ ...item }));
    this.showConfirmation = true;
    this.logger.log('Order confirmed.');
  }

  getConfirmedTotal(): number {
    return this.confirmedItems.reduce(
      (total, item) => total + this.utils.calculateSubtotal(item.product.price, item.quantity),
      0
    );
  }

  startNewOrder() {
    this.clearCart();
    this.confirmedItems = [];
    this.showConfirmation = false;
    this.logger.log('New order started.');
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
