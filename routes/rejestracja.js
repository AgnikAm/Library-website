var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/', function(req, res, next) {
  const warningMessage = req.flash('warning')[0];
  res.render('rejestracja', { title: 'Rejestracja', activePage: 'rejestracja', warningMessage });
});


router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash('warning', 'Użytkownik o takiej nazwie już istnieje. Wybierz inną');
      return res.redirect('/rejestracja');
    }

    const user = new User({ username, password });
    await user.save();
    res.redirect('/logowanie');
  } catch (error) {
    next(error);
  }
});

module.exports = router;

