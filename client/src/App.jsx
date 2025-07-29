import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { SidebarProvider } from './context/SidebarContext';
import { motion } from 'framer-motion';
import './index.css';
import './App.css';

import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/keep-alive`);
  }, []);
  return (
    <SidebarProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </motion.div>
    </SidebarProvider>
  );
}

export default App;
