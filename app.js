const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('./db/db');
const passport = require('./config/passport-config');

const app = express();

const render = require('./routes/render');
const auth = require('./routes/auth');
const books = require('./routes/books');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use('/', render);
app.use('/', auth);
app.use('/', books);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { error: err });
});

module.exports = app;