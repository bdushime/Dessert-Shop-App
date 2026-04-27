import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  /**
   * Helper utility to safely multiply prices by quantities,
   * keeping all logic centralized so different components don't repeat the math.
   */
  calculateSubtotal(price: number, quantity: number): number {
    return (price * 100 * quantity) / 100;
  }
}
