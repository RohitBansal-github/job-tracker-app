
import Job from '../models/jobModel.js';

export const createJob = async (req, res) => {
  try {
    const { company, position, status, appliedDate, notes } = req.body;
    const userId = req.user._id;

    if (!company || !position) {
      return res.status(400).json({ error: "Company and Position are required." });
    }

    const newJob = await Job.create({
      user: userId,
      company,
      position,
      status,
      appliedDate,
      notes,
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error("❌ Error in createJob:", error);
    res.status(500).json({ error: error.message });
  }
};

// 📄 Get All Jobs (Only for Logged-in User)
export const getJobs = async (req, res) => {
  try {
    const { status, search } = req.query;

    const query = { user: req.user._id };

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await Job.find(query)
      .select('_id company position status appliedDate notes')
      .sort({ appliedDate: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("❌ Error in getJobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
};




// 📄 Get Single Job
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch job', error });
    }
};

// ✏️ Update Job
export const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!updatedJob) return res.status(404).json({ message: 'Job not found or unauthorized' });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update job', error });
    }
};

// ❌ Delete Job
export const deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!deletedJob) return res.status(404).json({ message: 'Job not found or unauthorized' });

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete job', error });
    }
};

