import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, Cart],
  templateUrl: './app.html', 
  styleUrl: './app.css'    
})
export class AppComponent {
  title = 'dessert-shop';

  products = [
  {
    id: 1,
    name: 'Waffle with Berries',
    category: 'Waffle',
    price: 6.5
  },
  {
    id: 2,
    name: 'Classic Tiramisu',
    category: 'Dessert',
    price: 5.5
  },
  {
    id: 3,
    name: 'Vanilla Bean Crème Brûlée',
    category: 'Dessert',
    price: 7.0
  }
];

cart: any[] = [];
}