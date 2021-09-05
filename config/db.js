const mongoose = require('mongoose');

function connect() {

    // Change this url if in cloud
    let url = 'mongodb://localhost:27017/fakeNews';
    
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Mongo DB Connected"))
        .catch(err => console.log(err));
}
module.exports = connect();
