const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const fetch = require('cross-fetch');
require('dotenv').config()

const app = express();

require('./config/passport')(passport);

//app.use(morgan('tiny')); // to view logs


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


let cases = require('./models/covid');
//----------Fetching data from api and saving to MongoDB-----//
async function savedata(url,country) {
  
  try {
    const res = await fetch(url);
    
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    
    const data = await res.json();
    
    let c1 = new cases({
      name: country,
      confirmed: data.All.confirmed,
      death: data.All.deaths,
      
    })
    
    c1.save(err => {
      if (err) {
        console.log("Cannot Save");
      }
      else {
        console.log("Saved");
      }
    });

  } catch (err) {
    console.error(err);
  }
  
}


//------------Will fetch data from api only once a day----------//
var no = 0;
app.use(async function (req, res, next) {

  if (no == 0) {

    try {
      
      const records = await cases.find();
      if (records.length == 0) {
        console.log("no records");
        savedata('https://covid-api.mmediagroup.fr/v1/cases?country=India', 'India'); // Caching the data from api
        savedata('https://covid-api.mmediagroup.fr/v1/cases?country=Global', 'Global');
      }
      else {
        console.log("Lots of records");

        const r1 = await cases.find({ name: 'India' });
        //console.log(r1);
        if (r1[0].published_date == false) {
          let d1 = await cases.deleteOne({ name: "India" });
          savedata('https://covid-api.mmediagroup.fr/v1/cases?country=India', 'India');
         // console.log("Removed India");
        }

        const r2 = await cases.find({ name: 'Global' });
        //console.log(r2);
        if (r2[0].published_date == false) {
          let d2 = await cases.deleteOne({ name: "Global" });
          savedata('https://covid-api.mmediagroup.fr/v1/cases?country=Global', 'Global');
         // console.log("Global Removed");
        }

      }
    } catch (err) {
      console.log("Error in try-catch");
    }

  
    no = 1;
  }

  
  
  next();
})


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
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Running on port ${PORT}`));
