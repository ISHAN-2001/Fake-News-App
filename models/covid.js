const mongoose = require('mongoose')

const covidSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    confirmed: {
        type: String,
        required: true
    },
    death: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

covidSchema.virtual('published_date').get(function () {
    let d = new Date(this.date);
    let now = new Date();

    if (d.getDate() == now.getDate() && d.getMonth() == now.getMonth() && d.getFullYear() == now.getFullYear()) {
        return true;
    }
    else {
        return false;
    }
});

module.exports = mongoose.model("covid", covidSchema);