var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('aktualnosci', { title: 'Aktualności', activePage: 'aktualnosci', username: req.user ? req.user.username : null});
});

module.exports = router;
