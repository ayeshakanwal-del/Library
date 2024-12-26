const express = require('express');
const router = express.Router();

const authorRoutes = require('./authorRoutes');
const bookRoutes = require('./bookRoutes');
const borrowerRoutes = require('./borrowerRoutes');

router.use('/authors', authorRoutes);
router.use('/books', bookRoutes);
router.use('/borrowers', borrowerRoutes);

module.exports = router;
