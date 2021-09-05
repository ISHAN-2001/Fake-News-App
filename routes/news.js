var express = require('express');
var router = express.Router();
const users = require('../models/users');
const articles = require('../models/articles');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('',ensureAuthenticated,(req, res) => {
    res.redirect('/news/home');
})

router.get('/home', ensureAuthenticated, (req, res) => {
    // console.log(req.user);
    articles.find({})
        
        .sort({ _id: -1 })
        .then(records => {
            res.render('home', { user: req.user, records: records })
        })
        .catch(err => {
            console.log(err);
            res.redirect('/error');
        });
    
    
});

router.get('/view/:id', ensureAuthenticated, (req, res) => {
    let name;

    let id = req.params.id;
    articles.findById(id)
        .then(records => {
            if (!records) {
                res.redirect('/error');
            }
            // find author name and send here
            users.findById(records.author)
                .then(author => {
                    name = author.full_name;
                    res.render('articles', { user: req.user, records: records, name: name });
                })
                .catch(err => {
                    console.log("Author not found");
                    res.redirect('/error');
                });
            
            console.log(name);
            
        })
        .catch(err => {
            console.log(err);
            res.redirect('/error');
        });
});

router.get('/write', ensureAuthenticated ,(req, res) => {
    res.render('write',{user : req.user});
});

router.post('/write', (req, res) => {
    //console.log(req.body);
    // res.json(req.body);

    let user = req.user;
    let { category, title, body } = req.body;

    let a1 = new articles({
        category: category,
        title: title,
        body: body,
        author: user
    });

    a1.save(err => {
        if (err) {
            console.log(err);
            res.redirect('/error');
        }
        else {
            res.redirect('/news');
        }
    });

})

router.get('/about/:id', ensureAuthenticated, (req, res) => {
    
    let id = req.params.id;
    users.findById(id)
        .then(record => {
            if (!record) {
                res.redirect('/error');
            }
            //finding articles written by same author

            articles.find({ author: record._id })
                .sort({_id :-1})
                .then(articles => {
                    res.render('author', { user: req.user, author: record , articles: articles});
                })
                .catch(err => {
                    res.redirect('/error');
                });

        })
        .catch(err => {
            console.log(err);
            res.redirect('/error');
        });
    // res.render('author',{user : req.user});
});

router.get('/category/:cat', ensureAuthenticated, (req, res) => {
    
    let cat = req.params.cat;

    articles.find({ category: cat })
        .sort({_id:-1})
        .then(records => {
            res.render('category', { records: records,user: req.user });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/error')
        });
});

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    
    let id = req.params.id;

    articles.findByIdAndDelete(id)
        .then(records => {
            res.redirect('/news');
        })
        .catch(err => {
            res.redirect('/error');
        });
});

module.exports = router;

