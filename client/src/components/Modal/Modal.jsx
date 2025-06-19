import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[var(--card-bg)] rounded-xl shadow-lg p-6 max-w-sm w-full mx-4"
      >
        <h2 className="text-lg font-semibold text-[var(--primary)] mb-3">
          {title}
        </h2>
        <p className="text-sm text-[var(--secondary)] mb-6">{message}</p>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="btn btn-outline flex-1"
            aria-label="Cancel"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="btn btn-danger flex-1"
            aria-label="Confirm deletion"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;