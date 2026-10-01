const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    title: String,
    price: Number,
    thumbnail: String,
    quantity: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [itemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
