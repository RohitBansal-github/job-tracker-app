import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const JobForm = ({ onJobAdded, editJob, onJobUpdated }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editJob) {
      setCompany(editJob.company);
      setRole(editJob.position || editJob.role);
      setStatus(editJob.status);
      setAppliedDate(editJob.appliedDate?.slice(0, 10));
      setNotes(editJob.notes || "");
    }
  }, [editJob]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const jobData = { company, position: role, status, appliedDate, notes };

    try {
      if (editJob) {
        const res = await axios.put(
          `http://localhost:5000/api/jobs/${editJob._id}`,
          jobData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("🎉 Job updated successfully!");
        onJobUpdated(res.data);
      } else {
        const res = await axios.post("http://localhost:5000/api/jobs", jobData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("🎉 Job added successfully!");
        onJobAdded(res.data);
      }

      setCompany("");
      setRole("");
      setStatus("Applied");
      setAppliedDate("");
      setNotes("");
    } catch (err) {
      toast.error("⚠️ Failed to submit job");
      console.error(err);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-md max-w-2xl mx-auto w-full dark:bg-[var(--card-bg)]"
    >
      <h3 className="text-xl font-semibold text-[var(--primary)] mb-6">
        {editJob ? "Update Job" : "Add New Job"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="company" className="text-sm text-[var(--secondary)] mb-1">
            Company
          </Label>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <Input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
              required
              aria-label="Company name"
            />
          </motion.div>
        </div>
        <div>
          <Label htmlFor="role" className="text-sm text-[var(--secondary)] mb-1">
            Role
          </Label>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <Input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter job role"
              required
              aria-label="Job role"
            />
          </motion.div>
        </div>
        <div>
          <Label htmlFor="status" className="text-sm text-[var(--secondary)] mb-1">
            Status
          </Label>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" aria-label="Job status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 dark:border-zinc-700 shadow-md">
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Offered">Offered</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>

            </Select>
          </motion.div>
        </div>
        <div>
          <Label htmlFor="appliedDate" className="text-sm text-[var(--secondary)] mb-1">
            Applied Date
          </Label>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <Input
              id="appliedDate"
              type="date"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
              aria-label="Application date"
            />
          </motion.div>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Label htmlFor="notes" className="text-sm text-[var(--secondary)] mb-1">
            Notes (Optional)
          </Label>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes"
              rows={4}
              aria-label="Additional notes"
            />
          </motion.div>
        </div>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button type="submit" className="mt-6 btn btn-primary w-full text-gray-200" aria-label={editJob ? "Update job" : "Add job"}>
          {editJob ? "Update Job" : "Add Job"}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default JobForm;