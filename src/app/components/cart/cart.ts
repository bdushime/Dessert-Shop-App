import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart{
  // Injecting the same service instance
  public cartService = inject(CartService); 
}