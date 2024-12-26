const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    isbn: { type: String, required: true, unique: true },
    availableCopies: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: function (v) {
                return !(this.borrowFrequency > 10 && v > 100);
            },
            message: 'Available copies cannot exceed 100 if borrow frequency is above 10.',
        },
    },
    borrowFrequency: { type: Number, default: 0 },
});

module.exports = mongoose.model('Book', bookSchema);
