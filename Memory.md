# Memory (progress log)

## Status
Phases 1–8 complete (see Phases.md). Backend and frontend both build and run locally.

## Key decisions
- Backend proxies DummyJSON `/products`; cart stores a snapshot (title, price, thumbnail) per item.
- Cart item id in URLs = DummyJSON `productId`.
- Auth token in `localStorage` (`token`); `AuthContext` loads user via `/api/auth/me`.
- Vite proxies `/api` → `http://localhost:5000`, so the frontend uses relative URLs.
- Logged-out users clicking "Add To Cart" are redirected to `/login`.
- Product images come from DummyJSON thumbnails (Figma images were screenshots, not separate assets).

## Not done yet
Product details page, wishlist, checkout/orders, About/Contact/Account pages, tests.

## Run
Backend: `cd backend && npm install && npm run dev` (needs local MongoDB running).
Frontend: `cd frontend && npm install && npm run dev` → http://localhost:5173
