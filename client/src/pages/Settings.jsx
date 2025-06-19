import { useState, useContext } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import axios from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { name, email } = formData;
    if (!name || !email) {
      setError('Name and email are required');
      toast.error('⚠️ Name and email are required');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      toast.error('⚠️ Invalid email format');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.put('/users/me', formData);
      updateUser(response.data.user);
      toast.success('🎉 Profile updated successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(`⚠️ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto w-full px-4 sm:px-0"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6 text-center sm:text-left">
          Settings
        </h1>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-[var(--card-bg)] rounded-2xl shadow-md p-4 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4">
            Appearance
          </h2>
          <div className="flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg w-fit py-2 px-3">
            <Label htmlFor="theme-toggle" className="text-[var(--text-secondary)] text-sm sm:text-base">
              Dark Mode
            </Label>
            <Switch
              id="theme-toggle"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="bg-gray-300 data-[state=checked]:bg-[var(--accent)] shadow-md border border-gray-400"
            />
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[var(--card-bg)] rounded-2xl shadow-md p-4 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4">
            Profile
          </h2>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[var(--danger)] text-sm mb-4"
              aria-live="assertive"
            >
              {error}
            </motion.p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm text-[var(--text-secondary)] mb-1">
                Name
              </Label>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-label="Name"
                  disabled={isLoading}
                  className="input"
                />
              </motion.div>
            </div>
            <div>
              <Label htmlFor="email" className="text-sm text-[var(--text-secondary)] mb-1">
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
                  aria-label="Email"
                  disabled={isLoading}
                  className="input"
                />
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
                aria-label="Update Profile"
              >
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </motion.div>
          </form>
        </motion.section>
      </motion.div>
    </DashboardLayout>
  );
};

export default Settings;