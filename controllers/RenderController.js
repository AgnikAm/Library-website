const User = require('../models/user');

exports.renderStatic = function(req, res, next, page, title, activePage=null, message=null) {
    res.render(page, { 
      title: title, 
      activePage: activePage, 
      message: message,
      username: req.user ? req.user.username : null
    });
  };

exports.renderWithMessage = function(req, res, next, messageType, page, pageTitle, activePage) {
    const message = req.flash(messageType)[0];
    exports.renderStatic(req, res, next, page, pageTitle, activePage, message);
  };
