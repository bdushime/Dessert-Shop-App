import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  calculateSubtotal(price: number, quantity: number): number {
    return (price * 100 * quantity) / 100;
  }
}
