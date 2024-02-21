var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('onas', { title: 'O nas', activePage: 'onas', username: req.user ? req.user.username : null});
});

module.exports = router;
