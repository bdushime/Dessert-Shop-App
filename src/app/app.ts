import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { CartService } from './services/cart';
import { inject } from '@angular/core';




export interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  id: number;
  image: ProductImage;
  name: string;
  category: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProductListComponent, Cart],
  templateUrl: './app.html', 
  styleUrl: './app.css'    
})


export class AppComponent {
 public cartService = inject(CartService); 
  
  title = 'dessert-shop';
}