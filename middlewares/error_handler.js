const { CustomErrorType } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const error_handler = (error,req,res,next) => {
    const errObj = {
        statusCode : error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message : error.message || 'Something Went Wrong'
    }

    // if(error instanceof CustomErrorType) {
    //     //return res.status(error.statusCode).send(error.message);
    // }

    //handle mongoose validation
    if(error.name === "ValidationError"){
        errObj.statusCode = StatusCodes.BAD_REQUEST;
        errObj.message = Object.values(error.errors).map(keys=>keys.message).join(', ');
    }

    //handle duplicate email
    if(error.code && error.code === 11000) {
        errObj.statusCode = StatusCodes.BAD_REQUEST;
        errObj.message = 'Email already registered! Please enter different email';
    }

    //handle cast error
    if(error.name && error.name === "CastError"){
        errObj.statusCode = StatusCodes.BAD_REQUEST;
        errObj.message = `Invalid ${error.kind ? error.kind : 'request'}`;
    }

    res.status(errObj.statusCode).send(errObj.message);
}

module.exports = error_handler;