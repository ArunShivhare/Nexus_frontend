import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function PublicNavbar() {
  const location = useLocation();

  // 1. Initialize from localStorage (default to dark if nothing is saved)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Helper to highlight active links
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-[100] transition-all duration-300">
      {/* Subtle border and blur container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex items-center justify-between h-16 px-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-sm dark:shadow-2xl">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 transition-transform group-hover:scale-110">
              <img
                src="/favicon.png"
                className="w-6 h-6 brightness-110"
                alt="Nexus"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
              Nexus
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Dashboard", path: "/dashboard" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-purple-500 dark:hover:text-purple-400 ${
                  isActive(link.path)
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-lg"
              aria-label="Toggle Theme"
            >
              {darkMode ? "✨" : "🌙"}
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

            <Link
              to="/login"
              className="hidden sm:block text-sm font-semibold text-slate-900 dark:text-white px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              Log in
            </Link>

            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-950 hover:opacity-90 transition-all active:scale-95 shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
