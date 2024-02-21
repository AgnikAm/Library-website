const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const path = require('path');
const fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('dodawanie', { title: 'Dodaj książkę', username: req.user ? req.user.username : null});
});


const filePath = path.join(__dirname, '..', 'books.json');

router.post('/', async function(req, res, next) {
  try {
    const { title, author, availability } = req.body;

    // Read the existing data from the JSON file
    let booksData = JSON.parse(fs.readFileSync(filePath));

    // Create a new book object
    const newBook = { title, author, availability };

    // Add the new book to the existing data
    booksData.push(newBook);

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(booksData, null, 2));

    // Redirect to the katalog page
    res.redirect('/katalog');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
