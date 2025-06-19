import express from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import requireAuth from '../middlewares/authMiddleware.js'; // 👈 import middleware

const router = express.Router();

router.use(requireAuth); // 👈 apply to all routes

router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
