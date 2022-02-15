const CustomErrorType = require('./custom_error_type');
const { StatusCodes } = require('http-status-codes');

class AuthenticationError extends CustomErrorType {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
};

module.exports = AuthenticationError;