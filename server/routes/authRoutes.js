import express from 'express';
import { check } from 'express-validator';
import { signup, login, updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.put(
  '/me',
  [
    authMiddleware,
    check('name', 'Name is required').trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage('Name must be 2–50 characters'),
    check('email', 'Email is required').notEmpty(),
  ],
  updateProfile
);

export default router;
