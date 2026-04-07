import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, Cart],
  templateUrl: './app.html', // This matches your app.html
  styleUrl: './app.css'      // This matches your app.css
})
export class AppComponent {
  title = 'dessert-shop';
}