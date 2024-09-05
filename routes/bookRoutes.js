const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const { validateBook } = require('../middleware/bookValidation');

//   POST /api/books
//   Add a new book
router.post('/', verifyToken, checkRole(['Admin', 'Author']), validateBook, bookController.addBook);

//   GET /api/books
//   Get all books
router.get('/', verifyToken, checkRole(['Admin', 'Author', 'Reader']), bookController.getBooks);

//   PUT /api/books/:id
//   Update a book
router.put('/:id', verifyToken, checkRole(['Admin', 'Author']), validateBook, bookController.updateBook);

//   DELETE /api/books/:id
//   Delete a book
router.delete('/:id', verifyToken, checkRole(['Admin']), bookController.deleteBook);

module.exports = router;
