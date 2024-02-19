var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Strona główna' });
});

router.get('/', (req, res) => {
  res.render('index', { activePage: 'home' });
});

module.exports = router;
