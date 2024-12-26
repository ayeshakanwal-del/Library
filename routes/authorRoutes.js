const express = require('express');
const { addAuthor, getAuthors, updateAuthor, deleteAuthor, getAuthorsExceedingLimit } = require('../controllers/authorController');
const router = express.Router();

router.post('/', addAuthor);
router.get('/', getAuthors);
router.put('/:authorId', updateAuthor);
router.delete('/:authorId', deleteAuthor);
router.get('/exceeding-limit', getAuthorsExceedingLimit);

module.exports = router;
