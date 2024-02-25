const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/BooksController')

router.post('/dodawanie', BooksController.addBook);

module.exports = router;
