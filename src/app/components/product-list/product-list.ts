import { Component, Input } from '@angular/core'; 
import { ProductItem } from '../product-item/product-item';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem, NgFor],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  @Input() products: any[] = [];

}