const { CustomErrorType } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const error_handler = (error,req,res,next) => {
    if(error instanceof CustomErrorType) {
        return res.status(error.statusCode).send(error.message);
    }

    //handle duplicate email
    if(error.code && error.code === 11000)
        return res.status(StatusCodes.BAD_REQUEST).send('Email already registered!');
        
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
}

module.exports = error_handler;