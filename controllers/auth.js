const { StatusCodes } = require('http-status-codes');

const register = async (req,res) => {
    res.status(StatusCodes.OK).send('Register User');
};

const login = async (req,res) => {
    res.status(StatusCodes.OK).send('Login User');
};

module.exports = {
    register, login
};