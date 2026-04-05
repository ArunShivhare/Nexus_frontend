import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();

  const username = user?.name || "User";
  const userRole = user?.role || "Member";

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 backdrop-blur-md">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Branding & Identity */}
          <div className="flex items-center gap-5">
            <div
              className="relative group cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
                <img src="/favicon.png" className="w-7 h-7" alt="Nexus" />
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Hey,{" "}
                <span className="text-purple-600 dark:text-purple-400">
                  {username}
                </span>{" "}
                👋
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {userRole} Account
                </p>
              </div>
            </div>
          </div>

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

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-900 transition-all"
              title="Toggle Theme"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

            {/* Quick Actions / Notifications (Optional Placeholder) */}
            <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <span className="text-lg">🔔</span>
            </button>

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              <span>Logout</span>
              <span className="text-xs opacity-60">ESC</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
