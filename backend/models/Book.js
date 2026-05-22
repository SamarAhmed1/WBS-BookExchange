const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  author:      { type: String, required: true, trim: true },
  price:       { type: Number, min: 0 },
  condition:   {
    type: String,
    required: true,
    enum: {
      values: ['Like New', 'Very Good', 'Good', 'Fair'],
      message: 'condition must be one of: Like New, Very Good, Good, Fair',
    },
  },
  listingType: { type: String, enum: ['sell', 'swap'], required: true },
  description: { type: String },
  coverImage:  { type: String },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  validated:   { type: Boolean, default: false },
  available:   { type: Boolean, default: true },
  status:      { type: String, enum: ['active', 'sold', 'pending'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);