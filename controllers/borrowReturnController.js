const Borrower = require('../models/Borrower');
const Book = require('../models/Book');

// Borrow a book
exports.borrowBook = async (req, res, next) => {
  try {
    const { borrowerId, bookId } = req.body;

    // Find borrower and book
    const borrower = await Borrower.findById(borrowerId);
    const book = await Book.findById(bookId);

    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found.' });
    }

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    // Check if the borrower exceeds borrowing limit
    const maxBooks = borrower.membershipType === 'premium' ? 10 : 5;
    if (borrower.borrowedBooks.length >= maxBooks) {
      return res.status(400).json({ error: `Borrowing limit reached for ${borrower.membershipType} members.` });
    }

    // Check if the book has available copies
    if (book.availableCopies <= 0) {
      return res.status(400).json({ error: 'No available copies of this book.' });
    }

    // Update borrowedBooks for borrower and availableCopies for book
    borrower.borrowedBooks.push(bookId);
    book.availableCopies -= 1;
    book.borrowCount += 1;

    await borrower.save();
    await book.save();

    res.status(200).json({ message: 'Book borrowed successfully.' });
  } catch (error) {
    next(error);
  }
};

// Return a book
exports.returnBook = async (req, res, next) => {
  try {
    const { borrowerId, bookId } = req.body;

    // Find borrower and book
    const borrower = await Borrower.findById(borrowerId);
    const book = await Book.findById(bookId);

    if (!borrower || !book) {
      return res.status(404).json({ error: 'Borrower or Book not found.' });
    }

    // Check if the book is in the borrower's borrowedBooks
    if (!borrower.borrowedBooks.includes(bookId)) {
      return res.status(400).json({ error: 'This book was not borrowed by this borrower.' });
    }

    // Remove book from borrowedBooks array and increase availableCopies
    borrower.borrowedBooks = borrower.borrowedBooks.filter(id => id.toString() !== bookId.toString());
    book.availableCopies += 1;

    await borrower.save();
    await book.save();

    res.status(200).json({ message: 'Book returned successfully.' });
  } catch (error) {
    next(error);
  }
};
