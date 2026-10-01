# Exclusive — MERN E-Commerce

React + Vite frontend, Express backend, local MongoDB. Design based on the Figma "Full E-Commerce Website UI/UX Design (React Test)".

## Prerequisites
Node.js 18+ and MongoDB running locally on `127.0.0.1:27017`.

## Setup
```bash
# backend
cd backend
npm install
npm run dev        # http://localhost:5000

# frontend (new terminal)
cd frontend
npm install
npm run dev        # http://localhost:5173
```

`backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_secret_here
CLIENT_URL=http://localhost:5173
```
Change `JWT_SECRET` before any deployment.

## Usage
Open http://localhost:5173 → Sign Up → add products from Home → open the cart icon.

## Docs
PRD.md · Architecture.md · Rules.md · Phases.md · Design.md · Memory.md
