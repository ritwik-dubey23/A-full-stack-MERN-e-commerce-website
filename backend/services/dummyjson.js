const BASE = 'https://dummyjson.com';

const get = async (path) => {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const err = new Error(res.status === 404 ? 'Product not found' : 'DummyJSON request failed');
    err.status = res.status === 404 ? 404 : 502;
    throw err;
  }
  return res.json();
};

exports.getProducts = ({ limit = 12, skip = 0, category, q } = {}) => {
  if (q) return get(`/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`);
  if (category) return get(`/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`);
  return get(`/products?limit=${limit}&skip=${skip}`);
};
exports.getProduct = (id) => get(`/products/${id}`);
exports.getCategories = () => get('/products/category-list');
exports.getCarts = () => get('/carts');
exports.getCart = (id = 1) => get(`/carts/${id}`);

