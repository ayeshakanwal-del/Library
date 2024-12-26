const Borrower = require('../models/Borrower');
const Book = require('../models/Book');

// Add a new borrower
exports.addBorrower = async (req, res) => {
    try {
        const { name, membershipActive, membershipType } = req.body;

        const borrower = new Borrower({ name, membershipActive, membershipType });
        await borrower.save();

        res.status(201).json({ message: 'Borrower added successfully.', borrower });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update borrower details
exports.updateBorrower = async (req, res) => {
    try {
        const { borrowerId } = req.params;
        const updates = req.body;

        const borrower = await Borrower.findByIdAndUpdate(borrowerId, updates, { new: true });
        if (!borrower) return res.status(404).json({ error: 'Borrower not found.' });

        res.status(200).json({ message: 'Borrower updated successfully.', borrower });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ensure borrowing rules based on membership type
exports.ensureBorrowingRules = async (borrowerId, bookId) => {
    try {
        const borrower = await Borrower.findById(borrowerId).populate('borrowedBooks');
        const maxBooks = borrower.membershipType === 'premium' ? 10 : 5;

        if (borrower.borrowedBooks.length >= maxBooks) {
            throw new Error(`Borrowing limit exceeded for ${borrower.membershipType} membership.`);
        }

        const book = await Book.findById(bookId);
        if (!book || book.availableCopies <= 0) {
            throw new Error('No available copies of the book.');
        }

        return { borrower, book };
    } catch (error) {
        throw new Error(error.message);
    }
};
