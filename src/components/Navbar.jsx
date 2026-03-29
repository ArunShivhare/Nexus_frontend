import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const username = user?.name || "User";

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="
      sticky top-0 z-50 backdrop-blur-md border-b
      bg-white/70 border-gray-200
      dark:bg-gray-900/80 dark:border-gray-800
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Logo */}
          <div className="p-2 rounded-xl 
            bg-gradient-to-br from-purple-200 to-blue-300
            dark:from-purple-500 dark:to-blue-500 shadow-md">
            <img src="/favicon.png" className="w-8 h-8" />
          </div>

          {/* Greeting */}
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Hello,{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {username}
              </span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back to <span className="font-medium">Nexus</span>
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-lg text-sm
              bg-gray-200 text-gray-900
              dark:bg-gray-800 dark:text-white"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl text-sm font-medium text-white 
              bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
          >
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;