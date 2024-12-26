const Author = require('../models/Author');
const Book = require('../models/Book');

// Add a new author
exports.addAuthor = async (req, res, next) => {
  try {
    const { name, email, phoneNo } = req.body;

    // Check if the author already exists by email or phone number
    const existingAuthor = await Author.findOne({ $or: [{ email }, { phoneNo }] });
    if (existingAuthor) {
      return res.status(400).json({ error: 'Author with this email or phone number already exists.' });
    }

    const author = new Author({ name, email, phoneNo });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
};

// Get all authors
exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

// Update an author's information
exports.updateAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const updatedData = req.body;

    const author = await Author.findByIdAndUpdate(authorId, updatedData, { new: true });
    if (!author) {
      return res.status(404).json({ error: 'Author not found.' });
    }

    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

// Delete an author
exports.deleteAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const author = await Author.findByIdAndDelete(authorId);
    if (!author) {
      return res.status(404).json({ error: 'Author not found.' });
    }

    res.status(200).json({ message: 'Author deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// Get authors with more than 5 books
exports.getAuthorsExceedingLimit = async (req, res, next) => {
  try {
    const authors = await Author.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'author',
          as: 'books',
        },
      },
      {
        $match: {
          'books.5': { $exists: true }, // More than 5 books
        },
      },
    ]);

    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};
