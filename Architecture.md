# Architecture

## Stack
React 18 + Vite + react-router-dom · Node + Express 4 · MongoDB (local) + Mongoose · JWT + bcryptjs · DummyJSON (external product source).

## Flow
```
Browser (React, :5173)
  └─ /api/* (Vite proxy) ─► Express (:5000)
        ├─ routes → controllers → models (MongoDB local)
        └─ services/dummyjson.js → https://dummyjson.com
```
- Frontend never calls DummyJSON directly; the backend proxies it.
- Auth: login/register return `{token, user}`; token stored in `localStorage`, sent as `Authorization: Bearer <token>`.
- Cart: stored in MongoDB per user. Product title/price/thumbnail are snapshotted when added.

## Folder structure
```
project/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/      static assets
│       ├── components/  Navbar, Footer, ProductCard, SectionHeading, Icons, ProtectedRoute
│       ├── pages/       Home, Cart, Login, Register, NotFound, AuthForm (shared)
│       ├── layouts/     MainLayout (top bar + navbar + footer)
│       ├── services/    api.js (all HTTP calls)
│       ├── context/     AuthContext, CartContext
│       ├── hooks/       useCountdown
│       ├── utils/       format.js
│       ├── App.jsx  main.jsx  index.css
├── backend/
│   ├── config/db.js
│   ├── controllers/     auth, product, cart
│   ├── models/          User, Cart
│   ├── routes/          authRoutes, productRoutes, cartRoutes
│   ├── middleware/      auth (JWT), errorHandler
│   ├── services/        dummyjson
│   ├── utils/           token
│   ├── server.js  .env
└── PRD.md Architecture.md Rules.md Phases.md Design.md Memory.md README.md .gitignore
```

## Routing (frontend)
`/` Home · `/login` · `/register` · `/cart` (protected) · `*` 404.

## Maintenance
Update this file whenever a folder, route, model or API changes.
