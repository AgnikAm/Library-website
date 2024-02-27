const Book = require('../models/book');

exports.render = async function(req, res, next) {
    try {
        const query = req.query.query;
        let booksData = await search(query);
        
        res.render('catalogue', { 
            title: 'Katalog', 
            activePage: 'catalogue', 
            books: booksData, 
            username: req.user ? req.user.username : null
        });
    } catch (error) {
        next(error);
    }
};

exports.addBook = async function(req, res, next) {
    try {
        const { title, author, availability } = req.body;
        const newBook = new Book({ title, author, availability });
        
        await newBook.save();
        
        res.redirect('/katalog');
    } catch (error) {
        next(error);
    }
};

async function search(query) {
    let filter = {};
    if (query) {
        filter.$or = [
            { title: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } }
        ];
    }

    return await Book.find(filter);
}
