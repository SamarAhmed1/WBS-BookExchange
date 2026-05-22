const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { protect, adminOnly } = require('../middleware/auth');

// Get all available books (public)
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find({ available: true, status: 'active' })
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// Add a new book (authenticated users only)
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, author, price, condition, listingType, description, coverImage } = req.body;

    if (listingType === 'sell' && (!price || price <= 0)) {
      return res.status(400).json({ message: 'A valid price is required for sell listings' });
    }

    const book = await Book.create({
      title,
      author,
      price: listingType === 'sell' ? price : undefined,
      condition,
      listingType,
      description,
      coverImage,
      owner: req.user.id,
      validated: true,   // auto-validate all listings for now
      available: true,
      status: 'active',
    });

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// Get the logged-in user's own books
router.get('/my-books', protect, async (req, res, next) => {
  try {
    const books = await Book.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// Admin: validate a book for swapping
router.put('/:id/validate', protect, adminOnly, async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    book.validated = true;
    await book.save();
    res.json({ message: 'Book validated successfully', book });
  } catch (err) {
    next(err);
  }
});

module.exports = router;