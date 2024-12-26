const express = require('express');
const router = express.Router();
const { borrowBook, returnBook } = require('../controllers/bookController');

router.post('/borrow', borrowBook); // Borrow a book
router.post('/return', returnBook); // Return a book

module.exports = router;
