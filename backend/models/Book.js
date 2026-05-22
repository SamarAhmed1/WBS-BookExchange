const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number },
  condition: { type: String, enum: ['Like New', 'Very Good', 'Good', 'Fair'], default: 'Good' },
  listingType: { type: String, enum: ['sell', 'swap'], required: true },
  description: { type: String },
  coverImage: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  validated: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'sold', 'pending'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
