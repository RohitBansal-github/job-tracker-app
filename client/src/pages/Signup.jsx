import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Spinner control

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading
    try {
      await axios.post('/auth/signup', formData);
      toast.success('🎉 Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      toast.error('⚠️ Signup failed. Please try again.');
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-[var(--card-bg)] dark:from-[var(--card-bg)] dark:to-gray-900 relative"
    >
      <div className="absolute inset-0 bg-wave bg-no-repeat bg-cover bg-center z-0"></div>
      <div className="absolute inset-0 bg-white/60 z-10"></div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md p-8 bg-[var(--card-bg)] rounded-2xl shadow-xl dark:bg-[var(--card-bg)] relative z-20"
      >
        <h2 className="text-3xl font-bold text-[var(--primary)] mb-6 text-center">
          Sign Up
        </h2>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--danger)] text-sm mb-4 text-center"
            aria-live="assertive"
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--secondary)] mb-1">
              Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
              aria-label="Full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--secondary)] mb-1">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
              aria-label="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--secondary)] mb-1">
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
              aria-label="Password"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full flex items-center justify-center"
            aria-label="Sign up"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Please wait...
              </>
            ) : (
              'Sign Up'
            )}
          </motion.button>
        </form>
        <p className="mt-4 text-center text-sm text-[var(--secondary)]">
          Already have an account?{' '}
          <a href="/login" className="text-[var(--accent)] hover:text-amber-600 font-medium">
            Login
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Signup;
