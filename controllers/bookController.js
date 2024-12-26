const Book = require('../models/Book');
const Author = require('../models/Author');
const Borrower = require('../models/Borrower');

// Borrow a book
exports.borrowBook = async (req, res) => {
    try {
        const { borrowerId, bookId } = req.body;

        // Ensure borrower and book are valid
        const borrower = await Borrower.findById(borrowerId);
        const book = await Book.findById(bookId);

        if (!borrower) return res.status(404).json({ error: 'Borrower not found.' });
        if (!book) return res.status(404).json({ error: 'Book not found.' });

        const maxBooks = borrower.membershipType === 'premium' ? 10 : 5;
        if (borrower.borrowedBooks.length >= maxBooks) {
            return res.status(400).json({
                error: `Borrowing limit reached for ${borrower.membershipType} membership.`,
            });
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({ error: 'No available copies of the book.' });
        }

        // Update book and borrower
        book.availableCopies--;
        borrower.borrowedBooks.push(book._id);

        await book.save();
        await borrower.save();

        res.status(200).json({ message: 'Book borrowed successfully.', book, borrower });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        const { borrowerId, bookId } = req.body;

        // Ensure borrower and book are valid
        const borrower = await Borrower.findById(borrowerId);
        const book = await Book.findById(bookId);

        if (!borrower) return res.status(404).json({ error: 'Borrower not found.' });
        if (!book) return res.status(404).json({ error: 'Book not found.' });

        if (!borrower.borrowedBooks.includes(book._id)) {
            return res.status(400).json({ error: 'This book is not borrowed by the borrower.' });
        }

        // Update book and borrower
        book.availableCopies++;
        borrower.borrowedBooks = borrower.borrowedBooks.filter(
            (borrowedBookId) => borrowedBookId.toString() !== book._id.toString()
        );

        await book.save();
        await borrower.save();

        res.status(200).json({ message: 'Book returned successfully.', book, borrower });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const { title, authorId, isbn, availableCopies, borrowFrequency } = req.body;

        // Find the author by ID
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ error: 'Author not found.' });
        }

        // Create new book
        const newBook = new Book({
            title,
            author: author._id,  // Reference to the Author's _id
            isbn,
            availableCopies,
            borrowFrequency,
        });

        // Save the book and update the author's books array
        await newBook.save();
        author.books.push(newBook._id);
        await author.save();

        res.status(201).json({ message: 'Book added successfully.', newBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
