const Job = require('../models/jobs');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const get_jobs = async (req,res) => {
    const jobs = await Job.find({createdBy : req.user.id}).sort('createdAt');
    res.status(StatusCodes.OK).json({count: jobs.length,jobs});
};

const get_single_job = async (req,res) => {
    const { params: {id: jobID}, user: {id: userID} } = req;
    const job = await Job.findOne({_id : jobID, createdBy: userID});
    if(!job) throw new NotFoundError('Item not Found!');
    res.status(StatusCodes.OK).json(job);
};

const create_job = async (req,res) => {
    const {company, position} = req.body;
    if(!company || !position){
        throw new BadRequestError(`Please provide company and position values`);
    }
    req.body.createdBy = req.user.id;
    const newJob = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(newJob);
};

const update_job = async (req,res) => {
    const { params: {id:jobID}, user: {id:userID} } = req;
    
    const updated_job = await Job.findOneAndUpdate(
        {_id: jobID, createdBy: userID},
        req.body,{ new: true, runValidators: true}
    );
    if(!updated_job) throw new NotFoundError('Item not found!');
    
    res.status(StatusCodes.OK).json(updated_job);
};

const delete_job = async (req,res) => {
    const { params: {id:jobID}, user: {id:userID} } = req;
    
    const deleted_job = await Job.findOneAndDelete({_id: jobID, createdBy: userID});
    if(!deleted_job) throw new NotFoundError('Item not found!');
    
    res.status(StatusCodes.OK).json({msg:'Delete Successful'});
};

module.exports = {
    get_jobs,
    get_single_job,
    create_job,
    update_job,
    delete_job
};

