import { useContext } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { motion } from "framer-motion";
import { SidebarContext } from "@/context/SidebarContext";

const DashboardLayout = ({ children }) => {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex bg-[var(--background)] overflow-hidden relative"
    >
      {/* Sidebar - Fixed & transform based */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-40 bg-[var(--sidebar-bg)] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{ pointerEvents: isSidebarOpen ? 'auto' : 'none' }} // 👈 Add this line
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <div
        key={isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} // 👈 add key to force re-render
        className={`flex flex-col w-full transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
      >
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-16 lg:mt-20 overflow-auto">
          {children}
        </main>
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
