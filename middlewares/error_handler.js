const { CustomErrorType } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const error_handler = (error,req,res,next) => {
    if(error instanceof CustomErrorType) {
        return res.status(error.statusCode).send(error.message);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong. Please inform Administrator');
}

module.exports = error_handler;