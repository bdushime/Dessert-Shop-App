import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  cartService = inject(CartService);
}