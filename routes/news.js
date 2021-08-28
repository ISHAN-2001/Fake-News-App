var express = require('express');
var router = express.Router();

router.get('', (req, res) => {
    res.redirect('/news/home');
})

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/view/:id', (req, res) => {
    res.render('articles');
});

router.get('/write', (req, res) => {
    res.render('write');
});

router.get('/about/:id', (req, res) => {
    res.render('author');
});

module.exports = router;

