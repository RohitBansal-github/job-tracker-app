import { memo } from 'react';
import { useState } from "react";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Modal from "../Modal/Modal";

const JobCard = memo(({ job, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!job) return null;

  const statusColors = {
    Applied: "bg-blue-50 text-blue-700 ring-blue-200",
    Interview: "bg-yellow-50 text-yellow-700 ring-yellow-200",
    Offered: "bg-green-50 text-green-700 ring-green-200",
    Rejected: "bg-red-50 text-red-700 ring-red-200",
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${job._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🗑️ Job deleted successfully");
      onDelete(job._id);
    } catch (err) {
      toast.error("⚠️ Failed to delete job");
      console.error(err);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[var(--card-bg)] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
        whileHover={{ y: -5 }}
      >
        <div>
          <h2 className="text-lg font-semibold text-[var(--primary)] mb-3 truncate">
            {job.company}
          </h2>
          <p className="text-sm text-[var(--secondary)] mb-2">
            Role: {job.position}
          </p>
          <p className="text-sm mb-2">
            Status:{" "}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}
            >
              {job.status}
            </span>
          </p>
          <p className="text-sm text-[var(--secondary)]">
            Applied: {new Date(job.appliedDate).toLocaleDateString()}
          </p>
          {job.notes && (
            <p className="mt-3 text-sm text-[var(--secondary)] line-clamp-3">
              Notes: {job.notes}
            </p>
          )}
        </div>
        <div className="flex gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="btn btn-danger flex-1"
            aria-label={`Delete job at ${job.company}`}
          >
            Delete
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(job)}
            className="btn btn-primary flex-1"
            aria-label={`Edit job at ${job.company}`}
          >
            Edit
          </motion.button>
        </div>
      </motion.div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Job"
        message={`Are you sure you want to delete the application for ${job.company}? This action cannot be undone.`}
      />
    </>
  );
}); // ✅ Now semicolon is placed *after* the function ends

export default JobCard;
