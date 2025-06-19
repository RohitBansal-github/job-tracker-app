import { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      login(res.data.user, res.data.token);
      toast.success('🎉 Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error('⚠️ Login failed. Please check your credentials.');
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
          Login
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
            <Label htmlFor="email" className="text-sm text-[var(--secondary)] mb-1">
              Email
            </Label>
            <motion.div whileFocus={{ scale: 1.02 }}>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-label="Email address"
              />
            </motion.div>
          </div>
          <div>
            <Label htmlFor="password" className="text-sm text-[var(--secondary)] mb-1">
              Password
            </Label>
            <motion.div whileFocus={{ scale: 1.02 }}>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                aria-label="Password"
              />
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" className="w-full" aria-label="Login">
              Login
            </Button>
          </motion.div>
        </form>
        <div className="mt-4 text-center text-sm text-[var(--secondary)] space-y-1">
          <p>
            Don’t have an account?{' '}
            <Link to="/signup" className="text-[var(--accent)] hover:text-amber-600 font-medium">
              Sign up
            </Link>
          </p>
          <p>
            <Link to="/" className="text-[var(--accent)] hover:text-amber-600 font-medium">
              ← Back to Home
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;