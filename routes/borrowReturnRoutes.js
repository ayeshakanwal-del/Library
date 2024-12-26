const express = require('express');
const { borrowBook, returnBook } = require('../controllers/borrowReturnController');
const router = express.Router();

router.post('/borrow', borrowBook);
router.post('/return', returnBook);

module.exports = router;
