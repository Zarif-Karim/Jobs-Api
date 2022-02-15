const Job = require('../models/jobs');
const { StatusCodes } = require('http-status-codes');

const get_jobs = async (req,res) => {
    const jobs = await Job.find({createdBy : req.user.id}).sort('createdAt');
    res.status(StatusCodes.OK).json({count: jobs.length,jobs});
};

const get_single_job = async (req,res) => {
    res.status(StatusCodes.OK).send('Get Single Jobs');
};

const create_job = async (req,res) => {
    //need to validate input
    req.body.createdBy = req.user.id;
    const newJob = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(newJob);
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
    create_job,
    update_job,
    delete_job
};

