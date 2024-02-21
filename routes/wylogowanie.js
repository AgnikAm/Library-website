var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  req.logout(function(err) {
    if (err) {
      // Handle error if logout fails
      console.error('Logout failed:', err);
      return res.status(500).send('Logout failed');
    }
    // Redirect to the homepage after successful logout
    res.redirect('/');
  });
});

module.exports = router;
