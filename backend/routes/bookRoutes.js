const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { protect, adminOnly } = require('../middleware/auth');

// Get all available books (validated if swap, or just available)
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find({ available: { $ne: false } }).populate('owner', 'name');
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// Add a new book (User adds their own book to sell or swap)
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, author, price, condition, listingType, description, coverImage } = req.body;
    
    // If it's a swap book, it needs admin validation. If it's sell, maybe it's auto-validated.
    const validated = listingType === 'sell'; 

    const book = await Book.create({
      title, author, price, condition, listingType, description, coverImage,
      owner: req.user.id,
      validated
    });

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// Get user's own books
router.get('/my-books', protect, async (req, res, next) => {
  try {
    const books = await Book.find({ owner: req.user.id });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// Admin: Validate a book for swapping
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
