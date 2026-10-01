export const pad = (n) => String(n).padStart(2, '0');
export const money = (n) => `$${Math.round(n)}`;
export const oldPrice = (price, pct) => (pct > 0 ? price / (1 - pct / 100) : null);
