const request = async (path, { method = 'GET', body, token } = {}) => {
  const res = await fetch(`/api${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

export const authApi = {
  register: (body) => request('/auth/register', { method: 'POST', body }),
  login: (body) => request('/auth/login', { method: 'POST', body }),
  me: (token) => request('/auth/me', { token }),
};

export const productApi = {
  list: (params = {}) => request(`/products?${new URLSearchParams(params)}`),
  get: (id) => request(`/products/${id}`),
};

export const cartApi = {
  get: (token) => request('/cart', { token }),
  add: (token, productId, quantity = 1) => request('/cart', { method: 'POST', token, body: { productId, quantity } }),
  update: (token, productId, quantity) => request(`/cart/${productId}`, { method: 'PUT', token, body: { quantity } }),
  remove: (token, productId) => request(`/cart/${productId}`, { method: 'DELETE', token }),
  clear: (token) => request('/cart', { method: 'DELETE', token }),
};
