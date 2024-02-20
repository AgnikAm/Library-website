var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('logowanie', { title: 'Logowanie', activePage: 'logowanie' });
});

module.exports = router;
