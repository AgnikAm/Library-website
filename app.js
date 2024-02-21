// app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('./passport-config');
const MongoStore = require('connect-mongo');
const mongoose = require('./db');

const indexRouter = require('./routes/index');
const katalogRouter = require('./routes/katalog');
const aktualnosciRouter = require('./routes/aktualnosci');
const onasRouter = require('./routes/onas');
const galeriaRouter = require('./routes/galeria');
const kontaktRouter = require('./routes/kontakt');
const rejestracjaRouter = require('./routes/rejestracja');
const logowanieRouter = require('./routes/logowanie');
const wylogowanieRouter = require('./routes/wylogowanie');
const dodawanieRouter = require('./routes/dodawanie');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: 'mongodb://localhost:27017/your_database_name',
    mongooseConnection: mongoose.connection,
  }),
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
  });

// Routes setup
app.use('/', indexRouter);
app.use('/katalog', katalogRouter);
app.use('/aktualnosci', aktualnosciRouter);
app.use('/onas', onasRouter);
app.use('/galeria', galeriaRouter);
app.use('/kontakt', kontaktRouter);
app.use('/rejestracja', rejestracjaRouter);
app.use('/logowanie', logowanieRouter);
app.use('/wylogowanie', wylogowanieRouter);
app.use('/dodawanie', dodawanieRouter);


// Error handling
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
