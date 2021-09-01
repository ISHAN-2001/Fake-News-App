const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

module.exports = function(passport) {
    
  passport.use(
    new LocalStrategy(
        
        
        
    (username, password, done) => {
      User.findOne({ username: username })
        .then(user => {
          
          if (!user) {
            console.log("No user exists");
            return done(null, false, { message: "Not Registered" });
          }

          if (password == user.password) {
            console.log("Success..login")
            return done(null, user);
          }

          else {
            console.log("Password Incorrect");
            return done(null, false, { message: "Password Incorrect" });
          }

        })
        .catch(err => {
          console.log("DB error");
          res.redirect('/error')
        });
    })
  );
  
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
  
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  
  
  };