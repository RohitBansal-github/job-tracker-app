import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("🔐 Auth Header:", req.headers.authorization);
    console.log("🔐 Token Extracted:", token);

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');



        next();
    } catch (err) {
        console.log("❌ JWT Error:", err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default requireAuth;
