import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { cartApi } from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const run = useCallback(async (fn) => {
    setBusy(true); setError('');
    try { setItems((await fn()).items); } catch (e) { setError(e.message); } finally { setBusy(false); }
  }, []);

  useEffect(() => {
    if (token) {
      run(() => cartApi.get(token));
    } else {
      setItems([]);
    }
  }, [token, run]);

  const value = {
    items, busy, error,
    count: items.reduce((n, i) => n + i.quantity, 0),
    subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
    add: (id, qty = 1) => run(() => cartApi.add(token, id, qty)),
    setQty: (id, qty) => run(() => cartApi.update(token, id, qty)),
    remove: (id) => run(() => cartApi.remove(token, id)),
    clear: () => run(() => cartApi.clear(token)),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
