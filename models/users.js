const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user_schema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name cannot be empty"],
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

user_schema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

user_schema.methods.create_token = function(){
    return jwt.sign(
        {userID: this._id, userName: this.name},
        process.env.JWT_SECRET,
        { expiresIn: "7d"}
    );
}

user_schema.methods.compare_password = function (given) {
    return bcrypt.compare(given,this.password);
}

module.exports = mongoose.model('User', user_schema);