const express = require('express');
const router = express.Router();
const { getAuthorsExceedingLimit } = require('../controllers/authorController');

router.get('/exceeding-books', getAuthorsExceedingLimit);

module.exports = router;
