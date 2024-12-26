const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: require('../config/validation').emailRegex,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        match: require('../config/validation').phoneRegex,
    },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

authorSchema.virtual('bookCount').get(function () {
    return this.books.length;
});

module.exports = mongoose.model('Author', authorSchema);
