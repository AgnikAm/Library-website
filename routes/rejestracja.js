var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('rejestracja', { title: 'Rejestracja', activePage: 'rejestracja' });
});

module.exports = router;
