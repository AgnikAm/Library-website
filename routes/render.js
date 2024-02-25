const express = require('express');
const router = express.Router();

const RenderController = require('../controllers/RenderController');
const BooksController = require('../controllers/BooksController');

router.get('/', function(req, res, next) {
  RenderController.renderStatic(req, res, next, 'index', 'Strona główna', 'home');
});

router.get('/katalog', BooksController.render)

router.get('/onas', function(req, res, next) {
  RenderController.renderStatic(req, res, next, 'about-us', 'O nas', 'about-us');
});

router.get('/aktualnosci', function(req, res, next) {
  RenderController.renderStatic(req, res, next, 'news', 'Aktualności', 'news', req, res);
});

router.get('/galeria', function(req, res, next) {
  RenderController.renderStatic(req, res, next, 'gallery', 'Galeria', 'gallery');
});

router.get('/kontakt', function(req, res, next) {
  RenderController.renderStatic(req, res, next, 'contact', 'Kontakt', 'contact');
});

router.get('/rejestracja', function(req, res, next) {
  RenderController.renderWithMessage(req, res, next, 'warning', 'sign-up', 'Rejestracja', 'sign-up');
});

router.get('/logowanie', function(req, res, next) {
  RenderController.renderWithMessage(req, res, next, 'error', 'log-in', 'Logowanie', 'log-in');
});

router.get('/dodawanie', function(req, res, next) {
  RenderController.renderStatic(req, res, next, 'add-book', 'Dodaj książkę');
});

module.exports = router;

