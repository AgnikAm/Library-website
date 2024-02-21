var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Strona główna', activePage: 'home', username: req.user ? req.user.username : null});
});

module.exports = router;

