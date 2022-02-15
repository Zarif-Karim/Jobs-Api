const User = require('../models/users');
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("../errors");

const authenticate_user = async (req,res,next) => {
    const auth_header = req.headers.authorization;
    if(!auth_header || !auth_header.startsWith('Bearer ')){
        throw new AuthenticationError('Access Denied: Unauthorized');
    }

    const token = auth_header.split(' ')[1];
    try {
        const payload = await jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findOne({_id:payload.userID}).select('-password');
        if(!user) throw new AuthenticationError('Invalid token');

        req.user = { id : user._id, name : user.name };
        next();
    } catch(error) {
        throw new AuthenticationError('Invalid token');
    }
};

module.exports = authenticate_user;