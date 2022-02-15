require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//imports
const connect_db = require('./database/connect');
const { 
    not_found, error_handler, authenticate_user
} = require('./middlewares')
const auth_router = require('./routes/auth');
const jobs_router = require('./routes/jobs');

//middleware
app.use(express.json()); //parse request.body for json

//routes
app.use('/api/v1/auth', auth_router);
app.use('/api/v1/jobs', authenticate_user, jobs_router);

app.use(not_found);
app.use(error_handler);


//start server
const start = async () => {
    try{
        //connect to Database
        await connect_db();
        //start server
        const port = process.env.PORT || 5000;
        app.listen(port, ()=> console.log(`http://localhost:${port}`));
    } catch(error){
        console.log('Starting server failed', error);
        throw new Error('Could not Start Server');
    }
};

start();
