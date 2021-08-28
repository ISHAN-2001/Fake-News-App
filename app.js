const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express();
app.use(morgan('tiny'));

//--------Connecting DB-------//
let url  = require('./config/db')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongo DB Connected"))
    .catch(err => console.log(err));


// View Engine
app.set('view engine', 'ejs')

//Static folder
app.use('/static', express.static('static'))


// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//-------Routes------//
app.use('', require('./routes/login'));
app.use('/news', require('./routes/news'));

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
