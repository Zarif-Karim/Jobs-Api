const router = require('express').Router();
const { update } = require('lodash');
const {
    get_jobs,
    get_single_job,
    create_job,
    update_job,
    delete_job
} = require('../controllers/jobs');

router.route('/')
        .get(get_jobs)
        .post(create_job);
router.route('/:id')
        .get(get_single_job)
        .patch(update_job)
        .delete(delete_job);

module.exports = router;