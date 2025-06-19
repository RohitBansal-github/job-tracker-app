// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors({
 origin: "*", // test ke liye — prod mein specific origin do  // ✅ add deployed frontend too
  credentials: true,
}));


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authRoutes); // Added for /api/users/me
app.use('/api/jobs', jobRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
