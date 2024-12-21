const express = require('express');
const { getJobs, postJobs, getJobById } = require('../controllers/job.controller.js');

const router = express.Router();

router.get("/get-jobs", getJobs);
router.post("/add-job", postJobs);
router.get("/:id", getJobById);

module.exports = router;