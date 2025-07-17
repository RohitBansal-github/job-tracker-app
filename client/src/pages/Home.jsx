import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // 👈 import theme context

export default function Home() {
  const navigate = useNavigate();
  const { setTheme } = useTheme(); // 👈 get setTheme from context

  // 👇 Force light mode properly using context
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-wave bg-no-repeat bg-cover bg-center z-0"></div>
      <div className="absolute inset-0 bg-white/60 z-10"></div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-20 text-center max-w-2xl px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--primary)] mb-6">
          Welcome to JobTrack
        </h1>
        <p className="text-lg text-[var(--secondary)] mb-8">
          Effortlessly manage your job applications, track statuses, and stay organized in your job search journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className="btn btn-primary"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="btn btn-outline"
          >
            Login
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
