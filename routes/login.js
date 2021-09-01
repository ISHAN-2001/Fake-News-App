var express = require('express');
var router = express.Router();
const passport = require('passport');
const users = require('../models/users');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('', forwardAuthenticated , (req, res) => {
    res.redirect('/login');
});

router.get('/login', forwardAuthenticated ,(req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {

     passport.authenticate('local', {
        successRedirect: '/news',
        failureRedirect: '/login',
        failureFlash: true
       })(req, res, next);
    
});

router.get("/register",forwardAuthenticated , (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    // console.log(req.body);
    let { username, full_name, password1, password2 } = req.body;
    
    users.findOne({ username: username })
        .then(records => {
        
            if (records) {
                req.flash(
                    'error_msg',
                    'User is already Present'
                );
                res.redirect('/register');
            }
            else {

                if (password1 != password2) {
                    req.flash(
                        'error_msg',
                        'Password Invalid'
                    );
                    res.redirect('/register')
                }

                else {
                    let u1 = new users({
                        username: username,
                        full_name: full_name,
                        password: password1
                    });

                    u1.save(err => {
                        if (err) {
                            console.log("Error in saving")
                            res.redirect('/error')
                        }
                        else {
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                              );
                            res.redirect('/login');
                        }
                    }); // end of u1 save()

                } // end of else

            } // end of outer else
        })
        .catch(err => {
            console.log(err);
            res.redirect('/error')
        }); //end of catch

});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});

module.exports = router;
