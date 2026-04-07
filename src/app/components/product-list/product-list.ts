import { Component } from "@angular/core";

@Component({
  selector: 'app-product-list',
  standalone: true, 
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})

export class ProductListComponent {
  products = [
    { 
      name: 'Waffle with Berries', 
      category: 'Waffle', 
      price: 6.50, 
      image: 'https://placehold.co/300x200?text=Waffle' 
    },
    { 
      name: 'Vanilla Crème Brûlée', 
      category: 'Crème Brûlée', 
      price: 7.00, 
      image: 'https://placehold.co/300x200?text=Brulee' 
    },
    { 
      name: 'Macaron Mix', 
      category: 'Macaron', 
      price: 8.00, 
      image: 'https://placehold.co/300x200?text=Macaron' 
    }
  ];
}