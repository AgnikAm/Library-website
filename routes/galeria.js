var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('galeria', { title: 'Galeria', activePage: 'galeria', username: req.user ? req.user.username : null});
});

module.exports = router;
