const CustomErrorType = require('./custom_error_type');
const { StatusCodes } = require('http-status-codes');

class BadRequestError extends CustomErrorType {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
};

module.exports = BadRequestError;