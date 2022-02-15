const mongoose = require('mongoose');

const connect_db = () => {
    return mongoose.connect(process.env.MONGO_URI);
}

module.exports = connect_db;


