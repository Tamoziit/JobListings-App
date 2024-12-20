const express = require('express');
const { getJobs, postJobs } = require('../controllers/job.controller.js');

const router = express.Router();

router.get("/get-jobs", getJobs);
router.post("/list-jobs", postJobs);

module.exports = router;