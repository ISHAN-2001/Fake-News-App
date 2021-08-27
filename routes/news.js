var express = require('express');
var router = express.Router();

router.get('', (req, res) => {
    res.redirect('/news/home');
})

router.get('/home', (req, res) => {
    res.send("This is home page. Collection of all news are here");
});

router.get('/view/:id', (req, res) => {
    res.send(`We can view news in detail with id = ${req.params.id}`);
});

router.get('/write', (req, res) => {
    res.send("Write a news here");
});

router.get('/about/:id', (req, res) => {
    res.send("View all details about any author/user");
});

module.exports = router;

