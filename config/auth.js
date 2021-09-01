module.exports = {
    ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("User id allowed to view resource");
        return next();
    }
    console.log("User must login first")
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/news');   
    }
  };