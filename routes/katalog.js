var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('katalog', { title: 'Katalog', activePage: 'katalog' });
});

module.exports = router;
