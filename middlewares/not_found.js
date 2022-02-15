const { StatusCodes } = require('http-status-codes');

const not_found = (req,res) => {
    return res.status(StatusCodes.NOT_FOUND).send(`${StatusCodes.NOT_FOUND}: Address not found!`);
};

module.exports = not_found;