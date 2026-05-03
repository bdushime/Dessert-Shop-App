import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { ProductService } from './services/product.service';

import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, Cart],
  templateUrl: './app.html', 
  styleUrl: './app.css'    
})
export class AppComponent {
  title = 'dessert-shop';
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }
}