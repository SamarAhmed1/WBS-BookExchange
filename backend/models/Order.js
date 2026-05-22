const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  type: { type: String, enum: ['purchase', 'swap'], required: true },
  totalAmount: { type: Number },
  paymentMethod: { type: String },
  shippingAddress: { type: String },
  offeredBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
