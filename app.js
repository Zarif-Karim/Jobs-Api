require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//imports

//middleware
app.use(express.json()); //parse request.body for json

//app.use(express.static('./public'));

//routes
app.get('/', (req,res) => {
    res.status(200).send('<h2> Home Page </h2>');
});


//start server
const start = async () => {
    try{
        //connect to Database

        //start server
        const port = process.env.PORT || 5000;
        app.listen(port, ()=> console.log(`http://localhost:${port}`));
    } catch(error){
        console.log('Starting server failed', error);
        throw new Error('Could not Start Server');
    }
};

start();
