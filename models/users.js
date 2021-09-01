const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    
    full_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    joined: {
        type: Date,
        default: Date.now
    }
});

// personSchema.virtual('fullName').get(function() {
//     return this.name.first + ' ' + this.name.last;
//   });

userSchema.virtual('joined_date').get(function () {
    let d = new Date(this.joined);
    let now = new Date();

    if (d.getDate() == now.getDate() && d.getMonth() == now.getMonth() && d.getFullYear() == now.getFullYear()) {
        return 'Today';
    }
    else {
        return `${d.getDate()}/${d.getMonth() +1}/${d.getFullYear()}`
    }
})

module.exports = mongoose.model("users",userSchema);