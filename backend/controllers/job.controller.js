const Job = require("../models/job.model.js");

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll();
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error in getting Jobs", error);
        return res.status(500).json({ error: "Internal server Error" });
    }
};

const postJobs = async (req, res) => {
    try {
        const newJob = await Job.create(req.body);
        res.status(201).json({ message: "Job added successfully", job: newJob });
    } catch (error) {
        console.error("Error in posting Jobs", error);
        return res.status(500).json({ error: "Internal server Error" });
    }
};

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findByPk(jobId);
        
        if (!job) {
            return res.status(400).json({ error: "Job not found" });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error("Error in getting Job by ID", error);
        return res.status(500).json({ error: "Internal server Error" });
    }
};

module.exports = { getJobs, postJobs, getJobById };