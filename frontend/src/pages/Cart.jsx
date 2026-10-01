import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Close, ChevronR, Chevron } from '../components/Icons.jsx';
import { useCart } from '../context/CartContext.jsx';
import { money, pad } from '../utils/format.js';

export default function Cart() {
  const { items, subtotal, setQty, remove, clear, busy, error } = useCart();
  const [coupon, setCoupon] = useState('');

  return (
    <div className="container cart">
      <p className="crumbs"><Link to="/">Home</Link> / <span>Cart</span></p>
      {error && <p className="err api-err" role="alert">{error}</p>}

      {items.length === 0 ? (
        <div className="empty">
          <h2>Your cart is empty</h2>
          <p>Add products from the shop and they will show up here.</p>
          <Link to="/" className="btn btn-red">Return To Shop</Link>
        </div>
      ) : (
        <>
          <div className="cart-table">
            <div className="row head"><span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span></div>
            {items.map((it) => (
              <div className="row item" key={it.productId}>
                <span className="prod">
                  <span className="thumb">
                    <button className="remove" onClick={() => remove(it.productId)} aria-label={`Remove ${it.title}`} disabled={busy}><Close width={12} height={12} /></button>
                    <img src={it.thumbnail || '/gamepad.png'} alt={it.title} onError={(e) => { e.target.onerror = null; e.target.src = '/gamepad.png'; }} />
                  </span>
                  {it.title}
                </span>
                <span>{money(it.price)}</span>
                <span>
                  <span className="qty">
                    <b>{pad(it.quantity)}</b>
                    <span>
                      <button aria-label="Increase" onClick={() => setQty(it.productId, it.quantity + 1)} disabled={busy}><Chevron width={14} height={14} style={{ transform: 'rotate(180deg)' }} /></button>
                      <button aria-label="Decrease" onClick={() => it.quantity > 1 && setQty(it.productId, it.quantity - 1)} disabled={busy || it.quantity === 1}><Chevron width={14} height={14} /></button>
                    </span>
                  </span>
                </span>
                <span>{money(it.price * it.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <Link to="/" className="btn btn-outline">Return To Shop</Link>
            <button className="btn btn-outline" onClick={clear} disabled={busy}>Clear Cart</button>
          </div>

          <div className="cart-bottom">
            <form className="coupon" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Coupon Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
              <button className="btn btn-red">Apply Coupon</button>
            </form>
            <div className="totals">
              <h3>Cart Total</h3>
              <p><span>Subtotal:</span><span>{money(subtotal)}</span></p>
              <p><span>Shipping:</span><span>Free</span></p>
              <p><span>Total:</span><span>{money(subtotal)}</span></p>
              <button className="btn btn-red">Procees to checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
