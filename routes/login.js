var express = require('express');
var router = express.Router();

router.get('', (req, res) => {
    res.redirect('/login');
})

router.get('/login', (req, res) => {
    res.send("This is login Page");
});

router.get("/register", (req, res) => {
    res.send("This is register Page");
});

router.get('/logout', (req, res) => {
    res.send("Logout");
});

module.exports = router;
