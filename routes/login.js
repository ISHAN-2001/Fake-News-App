var express = require('express');
var router = express.Router();

router.get('', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/news')
})

router.get("/register", (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.redirect('/login');
});

router.get('/logout', (req, res) => {
    res.send("Logout");
});

module.exports = router;
