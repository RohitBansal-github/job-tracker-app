import { useState } from "react";
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
import { Label } from "@/components/ui/label";

const Filters = ({ onFilter }) => {
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const handleApply = () => {
    onFilter({ status, search });
  };

  const handleReset = () => {
    setStatus("All");
    setSearch("");
    onFilter({ status: "All", search: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center gap-4 max-w-4xl mx-auto w-full"
    >
      <div className="flex-1 w-full">
        <Label htmlFor="status" className="sr-only">
          Filter by status
        </Label>
        <motion.div whileFocus={{ scale: 1.02 }}>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger
              id="status"
              className="input w-full h-10"
              aria-label="Filter by status"
              // style={{ border: '1px solid red' }} // Debug: Uncomment to visualize
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 dark:border-zinc-700 shadow-md">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offered">Offered</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>
      <div className="flex-1 w-full">
        <Label htmlFor="search" className="sr-only">
          Search jobs
        </Label>
        <motion.div whileFocus={{ scale: 1.02 }}>
          <Input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company or role"
            className="input w-full h-10"
            aria-label="Search jobs"
            // style={{ border: '1px solid blue' }} // Debug: Uncomment to visualize
          />
        </motion.div>
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleApply}
            className="btn btn-primary flex-1 sm:flex-none h-10"
            aria-label="Apply filters"
            // style={{ border: '1px solid green' }} // Debug: Uncomment to visualize
          >
            Apply
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={handleReset}
            className="btn btn-outline flex-1 sm:flex-none h-10"
            aria-label="Reset filters"
            // style={{ border: '1px solid purple' }} // Debug: Uncomment to visualize
          >
            Reset
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Filters;