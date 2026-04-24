#  Dessert Shop App

Welcome to the **Dessert Shop App**, a modern, responsive web application built to demonstrate fundamental and advanced Angular concepts. This project showcases dynamic data binding, parent-child component architecture, and pixel-perfect UI cloning from Figma.

##  Live Demo
> **[]**

---

##  Features
- **Dynamic Shopping Cart**: Instantly tracks selected items, calculates the total price, and allows users to increase, decrease, or remove quantities.
- **Component Architecture**: Built using a strict, maintainable file structure including `product-list`, `product-item`, and `cart` components.
- **Top-down State Management**: Utilizes Angular's `@Input()` and `@Output()` to pass data securely from parent to child components and broadcast user actions upward without side-effects.
- **Responsive Design**: Designed Mobile-First using modern CSS Grid and Flexbox. Automatically adapts the layout to mobile, tablet, and desktop screens.
- **Adaptive Image Rendering**: Employs the HTML5 `<picture>` tag to dynamically load different image sizes (`mobile`/`tablet`/`desktop`) based on viewport width, optimizing performance and bandwidth.
- **Angular Directives & Pipes**: Heavily utilizes structured directives (`*ngIf`, `*ngFor`), attribute binding (`[class]`), and built-in pipes (`| currency`) for dynamic UI rendering.

---

##  Tech Stack
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
1. Clone the repo
   ```bash
   git clone [Insert your GitHub Repo URL here]
   ```
2. Navigate into the project directory
   ```bash
   cd dessert-shop
   ```
3. Install NPM packages
   ```bash
   npm install
   ```
4. Run the development server
   ```bash
   ng serve
   ```
5. Open your browser and visit: `http://localhost:4200/`

---

## 📄 Project Structure
This repository reflects standard Angular best practices:
```text
src/
├── app/
│   ├── components/
│   │   ├── cart/             # Shopping cart UI and calculations
│   │   ├── product-item/     # Individual product card UI and state
│   │   └── product-list/     # Maps over the JSON data array
│   ├── app.ts                # Parent state controller
│   └── app.html              # Main layout Grid
├── public/
│   └── assets/               # Product images and SVG icons
├── styles.css                # Global CSS variables and typography
└── data.json                 # Core product database
```

---

##  Acknowledgments
- Design provided by [Frontend Mentor](https://www.frontendmentor.io/).
- Developed as part of an Angular fundamentals lab.
