const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Book = require('../models/Book');
const { protect } = require('../middleware/auth');

// Create a purchase order
router.post('/buy', protect, async (req, res, next) => {
  try {
    const { bookId, paymentMethod, shippingAddress } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.listingType !== 'sell' || !book.available) {
      return res.status(400).json({ message: 'Book not available for purchase' });
    }

    const order = await Order.create({
      buyer: req.user.id,
      book: bookId,
      type: 'purchase',
      totalAmount: book.price,
      paymentMethod,
      shippingAddress
    });

    book.available = false; // Mark book as sold/unavailable
    book.status = 'sold';
    await book.save();

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// Create a swap request
router.post('/swap', protect, async (req, res, next) => {
  try {
    const { targetBookId, offeredBookId } = req.body;

    const targetBook = await Book.findById(targetBookId);
    if (!targetBook || targetBook.listingType !== 'swap' || !targetBook.available) {
      return res.status(400).json({ message: 'Target book not available for swap' });
    }

    const offeredBook = await Book.findById(offeredBookId);
    if (!offeredBook || offeredBook.owner.toString() !== req.user.id || !offeredBook.validated) {
      return res.status(400).json({ message: 'Your offered book must be validated by an admin first' });
    }

    const order = await Order.create({
      buyer: req.user.id,
      book: targetBookId,
      type: 'swap',
      offeredBook: offeredBookId
    });

    // We don't mark as unavailable until swap is confirmed by the other user, but we could set status pending.
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// Get user's orders (purchases and swaps)
router.get('/my-orders', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).populate('book offeredBook');
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
