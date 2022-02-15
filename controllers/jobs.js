const { StatusCodes } = require('http-status-codes');

const get_jobs = async (req,res) => {
    res.status(StatusCodes.OK).send('Get Jobs');
};

const get_single_job = async (req,res) => {
    res.status(StatusCodes.OK).send('Get Single Jobs');
};

const update_job = async (req,res) => {
    res.status(StatusCodes.OK).send('Update Job');
};

const delete_job = async (req,res) => {
    res.status(StatusCodes.OK).send('Delete Job');
};

module.exports = {
    get_jobs,
    get_single_job,
    update_job,
    delete_job
};

