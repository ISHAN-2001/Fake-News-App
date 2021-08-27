var express = require('express');
var router = express.Router();

router.get('', (req, res) => {
    res.redirect('/login');
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.get("/register", (req, res) => {
    res.render('register');
});

router.get('/logout', (req, res) => {
    res.send("Logout");
});

module.exports = router;
