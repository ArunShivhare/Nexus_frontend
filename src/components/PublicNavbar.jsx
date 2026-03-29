import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function PublicNavbar() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="
      sticky top-0 z-50 backdrop-blur-md border-b
      bg-white/70 border-gray-200
      dark:bg-gray-900/80 dark:border-gray-800
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl 
            bg-linear-to-br from-purple-200 to-blue-300
            dark:from-purple-500 dark:to-blue-500">
            <img src="/favicon.png" className="w-6 h-6" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            Nexus
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">

          <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400">
            Home
          </Link>

          <Link to="/login" className="hover:text-purple-600 dark:hover:text-purple-400">
            Login
          </Link>

          <Link to="/about" className="hover:text-purple-600 dark:hover:text-purple-400">
            About
          </Link>

        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 rounded-lg text-sm
            bg-gray-200 text-gray-900
            dark:bg-gray-800 dark:text-white"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

      </div>
    </nav>
  );
}

export default PublicNavbar;