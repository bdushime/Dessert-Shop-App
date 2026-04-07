import { Component, inject } from '@angular/core'; 
import { CartService } from '../../services/cart'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  // 3. This is how the component "talks" to the service
  private cartService = inject(CartService);

  products = [
    { name: 'Waffle with Berries', price: 6.50, category: 'Waffle', image: 'https://placehold.co/300x200?text=Waffle' },
    { name: 'Vanilla Crème Brûlée', price: 7.00, category: 'Crème Brûlée', image: 'https://placehold.co/300x200?text=Brulee' },
    { name: 'Macaron Mix', price: 8.00, category: 'Macaron', image: 'https://placehold.co/300x200?text=Macaron' }
  ];

  handleAddToCart(item: any) {
    // 4. Instead of just logging, we send the data to the service!
    this.cartService.addToCart(item);
    console.log('Item sent to service:', item.name);
  }
}