const mongoose = require('mongoose');
require('dotenv').config()

function connect() {
    
    let password = process.env.MONGO_URL; //Type your password here
    // Change this url if in cloud
    let url = `mongodb+srv://Project:${password}@cluster0.clm6b.mongodb.net/Fake-News?retryWrites=true&w=majority`;
    
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Mongo DB Connected"))
        .catch(err => console.log(err));
}
module.exports = connect();