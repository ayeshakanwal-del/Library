const express = require('express');
const { addBorrower, updateBorrower, getBorrowers, deleteBorrower } = require('../controllers/borrowerController');
const router = express.Router();

router.post('/', addBorrower);
router.put('/:borrowerId', updateBorrower);
router.get('/', getBorrowers);
router.delete('/:borrowerId', deleteBorrower);

module.exports = router;
