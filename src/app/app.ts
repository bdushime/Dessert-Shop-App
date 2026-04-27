import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, Cart],
  templateUrl: './app.html', 
  styleUrl: './app.css'    
})
export class AppComponent {
  title = 'dessert-shop';
  products: any[] = [];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }
}