const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function(req, res, next) {
    const query = req.query.query;
    let booksData = JSON.parse(fs.readFileSync('books.json'));

    if (query) {
        const filteredBooks = booksData.filter(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) || 
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        booksData = filteredBooks;
    }

    res.render('katalog', { title: 'Katalog', activePage: 'katalog', books: booksData, username: req.user ? req.user.username : null});
});


module.exports = router;
