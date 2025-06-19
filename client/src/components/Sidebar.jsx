import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { SidebarContext } from "@/context/SidebarContext";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/jobs", icon: Briefcase, label: "Jobs" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <motion.aside
      initial={{ x: -256 }}
      animate={{ x: isSidebarOpen ? 0 : -256 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 min-h-screen w-64 bg-[var(--card-bg)] shadow-lg dark:bg-[var(--card-bg)] flex flex-col z-30 lg:z-40`}
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <svg
            className="w-8 h-8 text-[var(--accent)]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl font-bold text-[var(--primary)]">JobTrack</span>
        </div>
        <nav className="space-y-2 flex-grow">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => window.innerWidth < 1024 && toggleSidebar()} // Close on mobile
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--secondary)] hover:bg-blue-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="px-6 pb-2 pt-6 mt-auto mb-[5px]">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;