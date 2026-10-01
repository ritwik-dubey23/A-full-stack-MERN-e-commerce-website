import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, CartIcon, User, Chevron } from './Icons.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const submit = (e) => { e.preventDefault(); navigate(q.trim() ? `/?q=${encodeURIComponent(q.trim())}` : '/'); };

  return (
    <>
      <div className="topbar">
        <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <Link to="/">ShopNow</Link></p>
        <span className="lang">English <Chevron width={16} height={16} /></span>
      </div>
      <header className="nav">
        <div className="container nav-inner">
          <Link to="/" className="logo">Exclusive</Link>
          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            {!user && <NavLink to="/register">Sign Up</NavLink>}
          </nav>
          <div className="nav-tools">
            <form className="search" onSubmit={submit}>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="What are you looking for?" aria-label="Search products" />
              <button type="submit" aria-label="Search"><Search width={22} height={22} /></button>
            </form>
            <Link to="/" aria-label="Wishlist" className="icon-btn"><Heart /></Link>
            <Link to="/cart" aria-label="Cart" className="icon-btn"><CartIcon />{count > 0 && <b className="badge">{count}</b>}</Link>
            {user ? (
              <div className="account">
                <button className="icon-btn avatar" onClick={() => setOpen((o) => !o)} aria-label="Account menu"><User width={20} height={20} /></button>
                {open && (
                  <div className="dropdown" onMouseLeave={() => setOpen(false)}>
                    <p>{user.name}</p>
                    <Link to="/cart" onClick={() => setOpen(false)}>My Cart</Link>
                    <button onClick={() => { logout(); setOpen(false); navigate('/'); }}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" aria-label="Login" className="icon-btn"><User /></Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
