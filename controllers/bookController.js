const Book = require('../models/Book');

// Add a new book
exports.addBook = async (req, res, next) => {
  try {
    const { title, author, isbn, availableCopies } = req.body;
    const book = new Book({ title, author, isbn, availableCopies });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

// Fetch all books
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('author');
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
