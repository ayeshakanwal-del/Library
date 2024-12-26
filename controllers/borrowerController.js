const Borrower = require('../models/Borrower');
const Book = require('../models/Book');

// Add a new borrower
exports.addBorrower = async (req, res, next) => {
  try {
    const { name, membershipActive, membershipType } = req.body;

    // Ensure borrower doesn't exist with the same name
    const existingBorrower = await Borrower.findOne({ name });
    if (existingBorrower) {
      return res.status(400).json({ error: 'Borrower with this name already exists.' });
    }

    const borrower = new Borrower({ name, membershipActive, membershipType });
    await borrower.save();
    res.status(201).json(borrower);
  } catch (error) {
    next(error);
  }
};

// Update a borrower's information
exports.updateBorrower = async (req, res, next) => {
  try {
    const { borrowerId } = req.params;
    const updatedData = req.body;

    const borrower = await Borrower.findByIdAndUpdate(borrowerId, updatedData, { new: true });
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found.' });
    }

    res.status(200).json(borrower);
  } catch (error) {
    next(error);
  }
};

// Get all borrowers
exports.getBorrowers = async (req, res, next) => {
  try {
    const borrowers = await Borrower.find().populate('borrowedBooks');
    res.status(200).json(borrowers);
  } catch (error) {
    next(error);
  }
};

// Delete a borrower
exports.deleteBorrower = async (req, res, next) => {
  try {
    const { borrowerId } = req.params;
    const borrower = await Borrower.findByIdAndDelete(borrowerId);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found.' });
    }

    res.status(200).json({ message: 'Borrower deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
