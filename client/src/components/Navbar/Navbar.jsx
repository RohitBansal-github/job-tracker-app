import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { SidebarContext } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext"; // 👈 added
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, X, Sun, Moon } from "lucide-react"; // 👈 icons

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const { theme, toggleTheme } = useTheme(); // 👈 get theme & toggle
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-[var(--card-bg)] shadow-md"
    >
      <div className="w-full px-2 sm:px-6 lg:px-8 py-2 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            className="p-3 rounded-md hover:bg-[var(--hover-bg)]"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary)]" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary)]" />
            )}
          </motion.button>

          <motion.div
            className="flex items-center gap-1 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent)]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-base sm:text-lg font-bold text-[var(--primary)]">JobTrack</span>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* 🌗 Theme toggle icon */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-[var(--hover-bg)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </motion.button>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm text-[var(--text-secondary)] flex items-center gap-1 sm:gap-2 hidden sm:flex"
          >
            <User size={14} className="sm:w-4 sm:h-4" />
            {user?.name || "User"}
          </motion.span>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="btn btn-outline flex items-center gap-1 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10 px-2 sm:px-4"
              aria-label="Logout"
            >
              <LogOut size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
