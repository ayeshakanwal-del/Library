const express = require('express');
const router = express.Router();
const {
    addBorrower,
    updateBorrower,
} = require('../controllers/borrowerController');

// Add a new borrower
router.post('/', addBorrower);

// Update an existing borrower
router.put('/:borrowerId', updateBorrower);

module.exports = router;
