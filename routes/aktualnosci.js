var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('aktualnosci', { title: 'Aktualności', activePage: 'aktualnosci' });
});

module.exports = router;
