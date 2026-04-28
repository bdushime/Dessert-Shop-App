#  Dessert Shop App

Welcome to the **Dessert Shop App**, a modern, responsive web application built to demonstrate fundamental and advanced Angular concepts. This project showcases dynamic data binding, parent-child component architecture, and pixel-perfect UI cloning from Figma.

##  Live Demo
> **[https://soft-basbousa-7ef724.netlify.app/]**

---

##  Features
- **Dynamic Shopping Cart**: Instantly tracks selected items, calculates the total price, and allows users to increase, decrease, or remove quantities.
- **Component Architecture**: Built using a strict, maintainable file structure including `product-list`, `product-item`, and `cart` components.
- **Top-down State Management**: Utilizes Angular's `@Input()` and `@Output()` to pass data securely from parent to child components and broadcast user actions upward without side-effects.
- **Responsive Design**: Designed Mobile-First using modern CSS Grid and Flexbox. Automatically adapts the layout to mobile, tablet, and desktop screens.
- **Adaptive Image Rendering**: Employs the HTML5  tag to dynamically load different image sizes (`mobile`/`tablet`/`desktop`) based on viewport width, optimizing performance and bandwidth.
- **Angular Directives & Pipes**: Heavily utilizes structured directives (`*ngIf`, `*ngFor`), attribute binding (`[class]`), and built-in pipes (`| currency`) for dynamic UI rendering.

---

## 🛠️ Tech Stack
- **Framework**: [Angular](https://angular.io/) (v17+)
- **Languages**: TypeScript, HTML5, CSS3
- **Styling**: Vanilla CSS (CSS Custom Properties, Grid, Flexbox)

---

## 💻 Getting Started Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js and the Angular CLI installed.
```bash
npm install -g @angular/cli
```

### Installation
```bash
git clone https://github.com/bdushime/Dessert-Shop-App.git
cd Dessert-Shop-App
npm install
ng serve
```
Navigate to `http://localhost:4200/`

---

##  Lab 2 — Angular Services & Dependency Injection (`lab-part-2-services` branch)

> **Branch:** `lab-part-2-services`

This branch extends the Dessert Shop by refactoring the application to use **Angular Services** and **Dependency Injection (DI)**, moving business logic out of components and into dedicated, reusable service classes.

###  Objective

Replace the `@Input()` / `@Output()` data flow from Lab 1 with a **service-driven architecture** where components inject shared services to read and mutate application state — eliminating prop drilling and centralizing logic.

###  Services Created

| Service | File | Responsibility |
|---------|------|----------------|
| **ProductService** | `services/product.service.ts` | Provides the product catalog data to any component that needs it |
| **CartService** | `services/cart.service.ts` | Manages all cart state — add, remove, decrease quantity, clear cart, confirm order. Persists cart to `localStorage` |
| **LoggerService** | `services/logger.service.ts` | Centralized logging for all cart actions (add, remove, clear, confirm) |
| **UtilityService** | `services/utility.service.ts` | Shared helper functions like `calculateSubtotal(price, quantity)` |

###  Architecture Comparison

| Aspect | Lab 1 (`master`) | Lab 2 (`lab-part-2-services`) |
|--------|-------------------|-------------------------------|
| **Data flow** | `@Input()` / `@Output()` chains | Injected services |
| **Cart logic lives in** | `AppComponent` | `CartService` |
| **Product data lives in** | `AppComponent` (hardcoded array) | `ProductService` |
| **State persistence** | None (lost on refresh) | `localStorage` via `CartService` |
| **Logging** | None | `LoggerService` logs every action |
| **Subtotal calculation** | Inline expressions | `UtilityService.calculateSubtotal()` |

###  How Dependency Injection Works Here

All services use `@Injectable({ providedIn: 'root' })`, which registers them as **singleton instances** available application-wide. Components access them using Angular's `inject()` function:

```typescript
// In ProductItem component
cartService = inject(CartService);

// In Cart component  
cartService = inject(CartService);
```

Both components share the **same instance** of `CartService` — when `ProductItem` calls `cartService.addToCart()`, the `Cart` component's template immediately reflects the change because they reference the same `items[]` array.

###  New Features in Lab 2

- **Persistent Cart** — Cart items are saved to `localStorage` and automatically restored when the page reloads
- **Order Confirmation Modal** — Animated modal overlay showing order summary with product thumbnails, quantities, individual prices, and total
- **Action Logging** — Every cart action (add, remove, decrease, clear, confirm) is logged via `LoggerService`
- **Centralized Calculations** — `UtilityService` handles price calculations, keeping components clean

###  Project Structure (Lab 2)

```
src/app/
├── services/
│   ├── product.service.ts       # Provides product catalog data
│   ├── cart.service.ts           # Cart state + localStorage + confirmation modal
│   ├── logger.service.ts         # Centralized console logging
│   └── utility.service.ts        # Shared helper functions
├── components/
│   ├── product-list/             # Loops products → renders product-item
│   ├── product-item/             # Product card — injects CartService directly
│   └── cart/                     # Cart display + order confirmation modal
├── app.ts                        # Root component (minimal — delegates to services)
├── app.html                      # Layout template
└── app.css                       # Global styles
```

###  Key Angular Concepts Demonstrated

- **`@Injectable()` decorator** — Marks a class as available for dependency injection
- **`providedIn: 'root'`** — Creates a singleton service without needing to list it in a module's `providers` array
- **`inject()` function** — Modern alternative to constructor-based DI for injecting services
- **Service-to-component binding** — Templates read directly from injected service properties (e.g., `cartService.items`)
- **Separation of Concerns** — Components handle UI rendering; services handle business logic and state

---


