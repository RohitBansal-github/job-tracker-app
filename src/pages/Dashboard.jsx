import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import JobCard from "@/components/JobCard/JobCard";
import JobForm from "@/components/JobForm/JobForm";
import Filters from "@/components/Filters";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editJob, setEditJob] = useState(null);

  const fetchJobs = async ({ status, search } = {}) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view jobs");
      toast.error("⚠️ Please log in to view jobs");
      setLoading(false);
      return;
    }

    try {
      let query = "";
      if (status && status !== "All") query += `status=${status}&`;
      if (search) query += `search=${search}&`;

      const res = await axios.get(`/jobs?${query}`);
      setJobs(res.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", {
        message: err.message,
        status: err.response?.status,
        url: err.config?.url,
      });
      setError("Failed to load jobs");
      toast.error("⚠️ Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobAdded = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs((prev) => prev.map((job) => (job._id === updatedJob._id ? updatedJob : job)));
    setEditJob(null);
  };

  const handleJobDeleted = (jobId) => {
    setJobs((prev) => prev.filter((job) => job._id !== jobId));
  };

  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: ["Applied", "Interview", "Offered", "Rejected"],
    datasets: [
      {
        label: "Job Applications",
        data: [
          statusCounts.Applied || 0,
          statusCounts.Interview || 0,
          statusCounts.Offered || 0,
          statusCounts.Rejected || 0,
        ],
        backgroundColor: ["#2dd4bf", "#f59e0b", "#10b981", "#ef4444"],
        borderColor: ["#14b8a6", "#d97706", "#059669", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Application Status Overview" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Count" } },
    },
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-0 w-full"
      >
        <Breadcrumbs />
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-center sm:text-left">
            Your Job Applications
          </h2>
        </header>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-[var(--card-bg)] rounded-2xl shadow-md p-4 sm:p-6"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4">
            Application Stats
          </h3>
          <div className="relative h-48 sm:h-64 w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 bg-[var(--card-bg)] rounded-2xl shadow-md p-4 sm:p-6"
        >
          <JobForm
            onJobAdded={handleJobAdded}
            editJob={editJob}
            onJobUpdated={handleJobUpdated}
          />
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
            <p className="text-[var(--text-secondary)] mt-2" aria-live="polite">
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
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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
                    onEdit={setEditJob}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-10"
              >
                <svg
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-[var(--text-secondary)] mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-[var(--text-secondary)] text-base sm:text-lg">
                  No jobs found. Add a new job to get started!
                </p>
              </motion.div>
            )}
          </motion.section>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;