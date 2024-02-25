const fs = require('fs');

exports.render = function(req, res, next) {
    const query = req.query.query;
    let booksData = search(query);

    res.render('catalogue', { 
        title: 'Katalog', 
        activePage: 'catalogue', 
        books: booksData, 
        username: req.user ? req.user.username : null
    });
};

exports.addBook = function(req, res, next) {
    try {
        const { title, author, availability } = req.body;
        const newBook = { title, author, availability };

        let booksData = JSON.parse(fs.readFileSync('./db/books.json'));
        booksData.push(newBook);
        fs.writeFileSync('./db/books.json', JSON.stringify(booksData, null, 2));

        res.redirect('/katalog');
    } catch (error) {
        next(error);
    }
};

function search(query) {
    let booksData = JSON.parse(fs.readFileSync('./db/books.json'));

    if (query) {
        const filteredBooks = booksData.filter(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) || 
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        return filteredBooks;
    }

    return booksData;
}
