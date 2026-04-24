#  Dessert Shop App

Welcome to the **Dessert Shop App**, a modern, responsive web application built to demonstrate fundamental and advanced Angular concepts. This project showcases dynamic data binding, parent-child component architecture, and pixel-perfect UI cloning from Figma.

##  Live Demo
> **[Insert your deployed Netlify/Vercel URL here]**

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
