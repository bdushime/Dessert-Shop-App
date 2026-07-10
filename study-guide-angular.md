# 🎓 Angular Component Architecture: The Dessert Shop

Welcome to your study guide! This document explains exactly how your Dessert Shop application works behind the scenes. 

When your Senior Developer reviews this with you, the most important concept they will test you on is **Component Communication** (often called "Top-Down Data Flow"). 

## The "Big Picture"
In Angular, components are organized like a family tree. 
- **`AppComponent`** is your "Parent". It holds the ultimate source of truth: the `products` database and the `cart` state.
- **`ProductListComponent`** and **`CartComponent`** are your "Children". They don't store their own independent cart data. Instead, the Parent passes data **DOWN** to them.
- When a user clicks a button inside a Child, the Child doesn't change the data. Instead, it emits an Event **UP** to the Parent, and the Parent handles the logic.

---

## 1. The Parent: `app.ts` (AppComponent)
This file is the brain of your application. Let's break it down line-by-line.

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
```
- **Lines 1-4**: These are your **imports**. We pull in Angular's core `Component` tool, routing capabilities, and crucially, we import your child components (`ProductListComponent` and `Cart`) so this parent can use them.

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, Cart],
  templateUrl: './app.html', 
  styleUrl: './app.css'    
})
```
- **Lines 6-12**: This is the `@Component` **Decorator**. It tells Angular that the class directly below it is an Angular Component.
  - `selector`: Tells Angular to inject this component wherever `<app-root>` appears in the index.html.
  - `standalone: true`: This is a modern Angular feature (v14+). It means this component doesn't need a bulky `app.module.ts` file to work. It handles its own dependencies!
  - `imports`: We explicitly declare which other standalone components this parent is allowed to render.
  - `templateUrl` / `styleUrl`: Tells Angular where to find the HTML and CSS for this specific component.

```typescript
export class AppComponent {
  title = 'dessert-shop';
  products = [ { "image": { ... }, "name": "Waffle...", ... } ];
  cart: any[] = [];
```
- **Line 13**: We export the class so Angular can bootstrap it. Everything inside these brackets is the "State" (the data) and the "Logic" (the methods).
- **Line 16-116**: We declare a `products` array containing standard JavaScript objects from your JSON file. This is our fake "database".
- **Line 118**: We declare an empty `cart` array. This will store the items the user selects.

```typescript
addToCart(product: any){
  const existingItem = this.cart.find(item => item.product.name === product.name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    this.cart.push({ product: product, quantity: 1 });
  }
}
```
- **Line 120-131**: The **Add to Cart Logic**. When a child component tells the parent "Hey, a user clicked Add to Cart on a Waffle!", this function runs.
  - `.find(...)`: It searches the `cart` array to see if an object with that exact product name is already in the cart.
  - `if (existingItem)`: If it finds it, we simply increment the `quantity` by `1`.
  - `else`: If they haven't added it before, we `.push()` a brand new object into the cart array containing the `product` payload and setting the starting `quantity` to `1`.

```typescript
removeItem(item: any) {
  this.cart = this.cart.filter(
    (cartItem) => cartItem.product.name !== item.product.name
  );
}
```
- **Line 133-137**: The **Remove Logic**. We use the JavaScript `.filter()` array method. It creates a brand new cart array containing *only* items whose names DO NOT match the item we want to delete. This safely deletes the cart item.

```typescript
decreaseQuantity(item: any) {
  const existingItem = this.cart.find((cartItem) => cartItem.product.name === item.product.name);
  if (!existingItem) return;

  if (existingItem.quantity > 1) {
    existingItem.quantity--;
  } else {
    this.removeItem(item);
  }
}
```
- **Lines 139-151**: The **Decrease Logic**. First, we find the item. If the quantity is currently 2 or more, we decrease it by 1 (`--`). If the quantity is exactly 1 and the user clicks minus again, we call our own `removeItem()` function to delete it entirely from the cart!

---

## 2. Defaulting the Layout: `app.html`
Let's see how the parent passes its data into the HTML grid.

```html
<div class="app-layout">
  <main class="max-w-7xl app-main">
    <h1 class="page-title">Desserts</h1>
    <div class="shop-grid">
```
- **Lines 1-4**: Basic container HTML to establish our layout structure.

```html
      <section class="products-section">
        <app-product-list 
           [products]="products" 
           [cart]="cart" 
           (addToCart)="addToCart($event)" 
           (decrease)="decreaseQuantity($event)">
        </app-product-list>
      </section>
```
- **Line 6**: This is where the magic happens. We render the child `<app-product-list>`.
- **`[products]="products"`**: The square brackets `[]` mean **Property Binding**. We are passing the parent's `products` array *down* into the child. 
- **`[cart]="cart"`**: Passing the parent's `cart` array *down* into the child.
- **`(addToCart)="addToCart($event)"`**: The parentheses `()` mean **Event Binding**. We are listening for the child to shout ("emit") an event named `addToCart`. When it shouts, we execute the parent's `addToCart()` function, and we pass in `$event` (which contains the specific product object the child clicked on!).
- **`(decrease)="decreaseQuantity($event)"`**: Same concept, listening for the decrease event.

```html
      <aside class="cart-section">
        <app-cart 
           [items]="cart" 
           (remove)="removeItem($event)" 
           (decrease)="decreaseQuantity($event)">
        </app-cart>  
      </aside>
```
- **Line 10**: Over in the sidebar, we render the `<app-cart>`. We pass the `cart` data down to it (we rename it `items` for the child), and we listen for `remove` and `decrease` events coming up from the cart child!

---

## 3. The Middleman: `product-list.ts`
This child receives the master data, and its whole job is to loop over it.

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core'; 
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
```
- **Lines 1-12**: Similar boilerplate to the app component, but note that we import `ProductItem` and `NgFor` because this component will render grandchild items inside a loop!

```typescript
  @Input() products: any[] = [];
  @Input() cart: any[] = [];
```
- **Lines 14-15**: **`@Input()` Decorators**. This tells Angular: "Hey, expect data to be passed into these variables from the parent template". This matches the `[products]="products"` we saw in `app.html`!

```typescript
  @Output() addToCart = new EventEmitter<any>();
  @Output() decrease = new EventEmitter<any>();
```
- **Lines 17-18**: **`@Output()` Decorators**. These are the megaphones! This child uses `EventEmitter` to construct custom events.

```typescript
  onAddToCart(product: any){
    this.addToCart.emit(product);
  }

  onDecrease(product: any) {
    this.decrease.emit({ product }); 
  }
```
- **Lines 20-26**: When a grandchild (`product-item`) is clicked, these functions run. All they do is grab the megaphone (`.emit()`) and shout the `product` object further up the chain to `app.ts` to actually handle the math.

```typescript
  getQuantity(product: any): number {
    const item = this.cart.find(c => c.product.name === product.name);
    return item ? item.quantity : 0;
  }
}
```
- **Line 28-31**: **Helper Function**. Our list rendering process needs to know how many of a specific item are currently in the cart so it can change the button appearance (from White to Red overlay). It searches the `@Input() cart` array for the product names. If it finds it, it returns the quantity (e.g., `3`). If the cart doesn't have it, it safely returns `0`.

---

## 4. The Loop: `product-list.html`
Let's see how this child transforms into a grid of grandchildren.

```html
<div class="product-grid">
  <app-product-item 
    *ngFor="let product of products" 
    [product]="product" 
    [quantity]="getQuantity(product)" 
    (addToCart)="onAddToCart($event)" 
    (decrease)="onDecrease($event)">
  </app-product-item>
</div>
```
- **Line 2**: This is the heart of Angular's rendering power.
  - **`*ngFor="let product of products"`**: This is a Structural Directive. It tells Angular to duplicate the `<app-product-item>` component 9 times (once for every object in your `products` array). `product` becomes the local variable for that specific dessert during the loop.
  - **`[product]="product"`**: We bind that specific dessert object and pass it *down* into the grandchild `<app-product-item>`.
  - **`[quantity]="getQuantity(product)"`**: We call our helper function so the grandchild knows exactly how many of itself are sitting in the cart!
  - **`(addToCart)` / `(decrease)`**: We set up listeners. If the grandchild item shouts that its button was clicked, this `product-list` component catches it and runs `onAddToCart($event)`, which passes that shout back up to the master parent!

---
*Ready to master the grandchildren? Next up, we will tackle the `product-item` and `cart` components!*
