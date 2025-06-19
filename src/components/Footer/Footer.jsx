import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--primary)] text-white py-6 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h3 className="ml-2 text-lg font-bold">JobTrack</h3>
          </div>
          <p className="text-sm text-gray-300">
            Streamline your job search with ease.
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-sm font-semibold text-gray-200 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Dashboard", "/dashboard", "Jobs", "/jobs", "Settings", "/settings"].map(
              (text, index) => (
                <li key={index}>
                  <Link
                    to={text[1]}
                    className="text-gray-300 hover:text-white transition duration-200"
                    aria-label={`Navigate to ${text[0]}`}
                  >
                    {text[0]}
                  </Link>
                </li>
              )
            )}
          </ul>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-gray-200 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:support@jobtrack.com"
                className="text-gray-300 hover:text-white transition duration-200"
                aria-label="Email support"
              >
                support@jobtrack.com
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="text-gray-300 hover:text-white transition duration-200"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="text-gray-300 hover:text-white transition duration-200"
                aria-label="Terms of Service"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 border-t border-gray-700/50 pt-4 text-center text-sm text-gray-300"
      >
        © {new Date().getFullYear()} JobTrack. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}

export default Footer;