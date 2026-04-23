import { Component, inject } from '@angular/core'; 
import { CartService } from '../../services/cart'; 
import {ProductItem} from '../product-item/product-item';
@Component({
  selector: 'app-product-list',
  imports:[ProductItem],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
 
}