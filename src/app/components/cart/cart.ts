import { Component, inject , Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart{
  
  @Input() items: any[] = [];

  @Output() remove = new EventEmitter<any>();

  @Output() decrease = new EventEmitter<any>();
  
 getTotal(): number {
  return this.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}
}