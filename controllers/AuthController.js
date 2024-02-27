const passport = require('../config/passport-config');
const User = require('../models/user');

exports.signup = async function(req, res, next) {
  try {
      const { username, email, password } = req.body;

      const existingUsername = await User.findOne({ username });
      const existingEmail = await User.findOne({ email });

      if (existingUsername && existingEmail) {
          req.flash('warning', 'Użytkownik o takiej nazwie i adresie e-mail już istnieje. Wybierz inne dane.');
          return res.redirect('/rejestracja');
      } else if (existingUsername) {
          req.flash('warning', 'Użytkownik o takiej nazwie już istnieje. Wybierz inną.');
          return res.redirect('/rejestracja');
      } else if (existingEmail) {
          req.flash('warning', 'Użytkownik o takim adresie e-mail już istnieje. Wybierz inny.');
          return res.redirect('/rejestracja');
      }

      const user = new User({ username, email, password });
      await user.save();
      res.redirect('/logowanie');
    } catch (error) {
        next(error);
    }
  };

  exports.login = function(req, res, next) {
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
  };

  exports.logout = function(req, res) {
    req.logout(function(err) {
      if (err) {
        console.error('Logout failed:', err);
        return res.status(500).send('Logout failed');
      }
      res.redirect('/');
    });
  };