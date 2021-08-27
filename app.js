const express = require('express')
const mongoose = require('mongoose')

const app = express();

//--------Connecting DB-------//
let url = 'mongodb://localhost:27017/test1'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongo DB Connected"))
    .catch(err => console.log(err));


// View Engine
app.set('view engine', 'ejs')


// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//-------Routes------//
app.use('', require('./routes/login'));
app.use('/news', require('./routes/news'));

//-----Server----//
app.listen(3000, console.log(`Running on http://localhost:3000`));
