import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((x) => x);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-sm text-[var(--secondary)] mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            to="/"
            className="text-[var(--accent)] hover:underline font-medium"
            aria-label="Home"
          >
            Home
          </Link>
        </li>
        {paths.map((path, index) => {
          const routeTo = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          return (
            <motion.li
              key={path}
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="mx-2 text-[var(--secondary)]">/</span>
              {isLast ? (
                <span className="text-[var(--secondary)] capitalize font-medium">
                  {path}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-[var(--accent)] hover:underline capitalize font-medium"
                  aria-label={`Navigate to ${path}`}
                >
                  {path}
                </Link>
              )}
            </motion.li>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumbs;