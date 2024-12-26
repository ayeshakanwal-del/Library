const Author = require('../models/Author');

// Get authors who exceed the book limit (more than 5 books)
exports.getAuthorsExceedingLimit = async (req, res) => {
    try {
        const authors = await Author.find().populate('books');
        const exceedingAuthors = authors.filter(author => author.books.length > 5);
        res.status(200).json(exceedingAuthors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
