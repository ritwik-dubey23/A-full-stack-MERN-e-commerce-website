# PRD — Exclusive E-Commerce (MERN)

## 1. Overview
Full-stack e-commerce web app based on the "Full E-Commerce Website UI/UX Design (React Test)" Figma file. Users can register, log in, browse products and manage a server-side cart.

## 2. Assignment requirements
- React + Vite frontend, Node + Express backend, MongoDB + Mongoose (local only), REST APIs.
- Pages: Login, Register, Home, Cart. UI must match the Figma screenshots.
- Product data via DummyJSON (https://dummyjson.com); cart persisted in MongoDB per user.
- Folder structure fixed (see Architecture.md). Local MongoDB: `mongodb://127.0.0.1:27017/ecommerce`.

## 3. Target users
Online shoppers who want to browse electronics/fashion products, sign in and keep a cart across sessions.

## 4. Features
- **Login / Register:** validated forms, bcrypt-hashed passwords, JWT auth, API error display.
- **Home:** top bar, navbar (search, cart badge, account menu), hero, Flash Sales (countdown + scroller), Browse By Category, Best Selling, music banner, Explore Our Products, New Arrival, services strip, footer.
- **Products:** list, search, category-based filtering through the backend (DummyJSON proxy).
- **Cart:** add from product cards, quantity +/-, remove, clear, subtotal/total, empty state, coupon + checkout UI (UI only).

## 5. Backend APIs
| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | /api/auth/register | – | Create user |
| POST | /api/auth/login | – | Log in, returns JWT |
| GET | /api/auth/me | JWT | Current user |
| GET | /api/products | – | List / search (`limit, skip, q, category`) |
| GET | /api/products/:id | – | Product details |
| GET | /api/products/categories | – | Category list |
| GET | /api/cart | JWT | Get cart |
| POST | /api/cart | JWT | Add `{productId, quantity}` |
| PUT | /api/cart/:id | JWT | Set quantity (`id` = productId) |
| DELETE | /api/cart/:id | JWT | Remove item |
| DELETE | /api/cart | JWT | Clear cart |

## 6. MongoDB
Collections: `users` (name, email unique, hashed password), `carts` (user ref unique, items[productId, title, price, thumbnail, quantity]).

## 7. Functional requirements
Registration rejects duplicate emails; login rejects wrong credentials; cart routes require a valid token and are scoped to the logged-in user; cart totals are computed from item price × quantity.

## 8. Non-functional requirements
Responsive (desktop/tablet/mobile); no plain-text passwords; secrets only in `.env`; consistent JSON error shape `{ message }`; accessible labels and keyboard focus.

## 9. Out of scope (for now)
Checkout/payment, wishlist persistence, product details page, admin, MongoDB Atlas.
