import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
  standalone: true
})
export class ProductItem {
  @Input() product: any;
  @Input() quantity: number = 0;
  
  @Output() addToCart = new EventEmitter<any>();
  @Output() decrease = new EventEmitter<any>();
}
