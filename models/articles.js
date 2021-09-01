const mongoose = require('mongoose')

var Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: { type: Schema.Types.ObjectId, ref: 'users' },
    
    date: {
        type: Date,
        default: Date.now
    }
});

articleSchema.virtual('published_date').get(function () {
    let d = new Date(this.date);
    let now = new Date();

    if (d.getDate() == now.getDate() && d.getMonth() == now.getMonth() && d.getFullYear() == now.getFullYear()) {
        return 'Today';
    }
    else {
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
});

module.exports = mongoose.model("articles", articleSchema);

