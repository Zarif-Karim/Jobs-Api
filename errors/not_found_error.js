const CustomErrorType = require('./custom_error_type');
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends CustomErrorType {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
};

module.exports = NotFoundError;