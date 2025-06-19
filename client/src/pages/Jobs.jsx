import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import JobCard from "../components/JobCard/JobCard";
import Filters from "../components/Filters";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async ({ status, search } = {}) => {
    try {
      const token = localStorage.getItem("token");
      let query = "";
      if (status && status !== "All") query += `status=${status}&`;
      if (search) query += `search=${search}&`;

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs?${query}`
        , {
          headers: { Authorization: `Bearer ${token}` },
        });

      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs");
      toast.error("⚠️ Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobDeleted = (jobId) => {
    setJobs((prev) => prev.filter((job) => job._id !== jobId));
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--primary)] text-center sm:text-left">
            Job Listings
          </h2>
        </header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Filters onFilter={fetchJobs} />
        </motion.section>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <svg
              className="animate-spin h-8 w-8 text-[var(--accent)] mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
              />
            </svg>
            <p className="text-[var(--secondary)] mt-2" aria-live="polite">
              Loading...
            </p>
          </motion.div>
        ) : error ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[var(--danger)] py-10"
            aria-live="assertive"
          >
            {error}
          </motion.p>
        ) : (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Job listings"
          >
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <JobCard
                    job={job}
                    onDelete={handleJobDeleted}
                    onEdit={() => toast.info("Edit functionality available in Dashboard")}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-[var(--secondary)] py-10"
              >
                No jobs found. Add a job in the Dashboard!
              </motion.p>
            )}
          </motion.section>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Jobs;