const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

const app = express();

require('./config/passport')(passport);

app.use(morgan('tiny')); // to view logs


//--------Connecting Mongo DB-------//
let url  = require('./config/db')



//------View Engine------//
app.set('view engine', 'ejs')

//-----Static folder------//
app.use('/static', express.static('static'))


//-----Body Parser-----//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//----express-session -----//
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//------Passport middleware------//
app.use(passport.initialize());
app.use(passport.session());


//------Connect flash------//
app.use(flash());

//-----Global variables for flash--------//
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//-------Routes------//
app.use('', require('./routes/login'));
app.use('/news', require('./routes/news'));


//-----404 error page------//
app.use(function(req, res, next) {
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('404');
      return;
    }

  });


//-----Server----//
app.listen(3000, console.log(`Running on http://localhost:3000`));
