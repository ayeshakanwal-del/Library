// Import mongoose
const mongoose = require('mongoose');

// Define the Borrower schema
const borrowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    membershipActive: { type: Boolean, required: true },
    membershipType: { 
        type: String, 
        enum: ['standard', 'premium'], 
        required: true 
    }
});

// Export the Borrower model
module.exports = mongoose.model('Borrower', borrowerSchema);
