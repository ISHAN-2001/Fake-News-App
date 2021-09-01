var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('',ensureAuthenticated,(req, res) => {
    res.redirect('/news/home');
})

router.get('/home', ensureAuthenticated, (req, res) => {
    console.log(req.user);
    res.render('home',{user : req.user});
});

router.get('/view/:id', ensureAuthenticated,(req, res) => {
    res.render('articles');
});

router.get('/write', ensureAuthenticated ,(req, res) => {
    res.render('write');
});

router.post('/write', (req, res) => {
    console.log(req.body);
    // res.json(req.body);
    res.render('test', { 'body': req.body.body });
})

router.get('/about/:id',ensureAuthenticated ,(req, res) => {
    res.render('author');
});

module.exports = router;

