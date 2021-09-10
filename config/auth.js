module.exports = {
    ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("User must login first")
      req.flash('error_msg', 'Please log in to continue');
      res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/news');   
    }
  };