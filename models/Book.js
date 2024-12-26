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
      validator: function () {
        return this.borrowCount <= 10 || this.availableCopies <= 100;
      },
      message: 'Available copies cannot exceed 100 if the borrow count is over 10.',
    },
  },
  borrowCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Book', bookSchema);
