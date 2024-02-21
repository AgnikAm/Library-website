var express = require('express');
const passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  const warningMessage = req.flash('error')[0];
  res.render('logowanie', { title: 'Logowanie', activePage: 'logowanie', warningMessage });
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.flash('error', 'Nieprawidłowe hasło lub nazwa użytkownika');
      return res.redirect('/logowanie');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
