const { StatusCodes } = require('http-status-codes');
const User = require('../models/users');
const { AuthenticationError,BadRequestError } = require('../errors');

const register = async (req,res) => {
    const newUser = await User.create({...req.body});
    const token = newUser.create_token();
    res.status(StatusCodes.OK).json({message : "New User Created", name: newUser.name, token});
};

const login = async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        throw new BadRequestError('Need to enter both email and password');
    }

    const user = await User.findOne({email});
    if(!user) throw new AuthenticationError('Invalid Credentials');
    const isPasswordCorrect = user.compare_password(password);
    if(!isPasswordCorrect) throw new AuthenticationError('Invalid Credentials');

    const token = user.create_token();
    res.status(StatusCodes.OK).json({message : "Successfully Logged In", name: user.name, token});
};

module.exports = {
    register, login
};