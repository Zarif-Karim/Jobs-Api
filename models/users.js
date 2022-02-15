const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name must be entered"],
        minlength: 3,
        maxlength: 30
    },
    email : {
        type: String,
        required: [true, "Email cannot be empty"],
        unique: true,
        validate: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ]
    },
    password : {
        type: String,
        required: [true, "Password cannot be empty"],
        minlength: 6
    }
});

module.exports = mongoose.model('User', user_schema);