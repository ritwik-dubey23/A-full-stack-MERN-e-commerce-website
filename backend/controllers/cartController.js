const Cart = require('../models/Cart');
const dj = require('../services/dummyjson');

const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  if (cart.items.length === 0) {
    try {
      const dummyCart = await dj.getCart(1);
      if (dummyCart && Array.isArray(dummyCart.products)) {
        cart.items = dummyCart.products.slice(0, 3).map((p) => ({
          productId: p.id,
          title: p.title,
          price: p.price,
          thumbnail: p.thumbnail,
          quantity: p.quantity || 1,
        }));
        await cart.save();
      }
    } catch (err) {
      // fallback cleanly if external API fails
    }
  }
  return cart;
};

exports.get = async (req, res, next) => {
  try { res.json(await getCart(req.user._id)); } catch (err) { next(err); }
};

exports.getDummyCart = async (req, res, next) => {
  try {
    const data = await dj.getCarts();
    res.json(data);
  } catch (err) { next(err); }
};


exports.add = async (req, res, next) => {
  try {
    const productId = Number(req.body.productId);
    const quantity = Math.max(1, Number(req.body.quantity) || 1);
    if (!productId) return res.status(400).json({ message: 'productId is required' });

    const cart = await getCart(req.user._id);
    const existing = cart.items.find((i) => i.productId === productId);
    if (existing) existing.quantity += quantity;
    else {
      const p = await dj.getProduct(productId);
      cart.items.push({ productId, title: p.title, price: p.price, thumbnail: p.thumbnail, quantity });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const quantity = Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ message: 'Quantity must be 1 or more' });
    const cart = await getCart(req.user._id);
    const item = cart.items.find((i) => i.productId === Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not in cart' });
    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const cart = await getCart(req.user._id);
    cart.items = cart.items.filter((i) => i.productId !== Number(req.params.id));
    await cart.save();
    res.json(cart);
  } catch (err) { next(err); }
};

exports.clear = async (req, res, next) => {
  try {
    const cart = await getCart(req.user._id);
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (err) { next(err); }
};
