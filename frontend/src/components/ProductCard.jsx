import { useNavigate } from 'react-router-dom';
import { Heart, Eye, Star } from './Icons.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { money, oldPrice } from '../utils/format.js';

export default function ProductCard({ product, showRating = true, badge }) {
  const { token } = useAuth();
  const { add, busy } = useCart();
  const navigate = useNavigate();
  const pct = Math.round(product.discountPercentage || 40);
  const old = oldPrice(product.price, pct);
  const stars = Math.round(product.rating || 5);

  const isGamepad = product.title?.toLowerCase().includes('gamepad') || product.title?.toLowerCase().includes('controller') || product.id === 1 || product.id === 162;
  const imageSrc = isGamepad ? '/gamepad.png' : (product.thumbnail || '/gamepad.png');

  const addToCart = () => (token ? add(product.id) : navigate('/login', { state: { from: '/' } }));

  return (
    <article className="card">
      <div className="card-img">
        {badge ? <span className="tag tag-new">{badge}</span> : <span className="tag">-{pct || 40}%</span>}
        <div className="card-actions">
          <button aria-label="Wishlist"><Heart width={20} height={20} /></button>
          <button aria-label="Quick view"><Eye width={20} height={20} /></button>
        </div>
        <img
          src={imageSrc}
          alt={product.title}
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = '/gamepad.png'; }}
        />
        <button className="add" onClick={addToCart} disabled={busy}>Add To Cart</button>
      </div>
      <h3>{product.title}</h3>
      <p className="price"><span>{money(product.price)}</span>{old && <s>{money(old)}</s>}</p>
      {showRating && (
        <p className="rating">
          {[1, 2, 3, 4, 5].map((n) => <Star key={n} filled={n <= stars} />)}
          <em>({product.reviews?.length ?? product.stock ?? 88})</em>
        </p>
      )}
    </article>
  );
}

