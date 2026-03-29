import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <PublicNavbar />

      <div className="
        min-h-[90vh] flex flex-col items-center justify-center text-center px-6

        bg-gradient-to-br from-purple-50 via-white to-blue-50
        dark:from-black dark:via-gray-900 dark:to-black
      ">

        {/* Hero Title */}
        <h1 className="
          text-4xl md:text-6xl font-bold mb-6 leading-tight
          text-gray-900 dark:text-white
        ">
          Manage Your Team <br />
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Smarter & Faster 🚀
          </span>
        </h1>

        {/* Subtitle */}
        <p className="
          text-gray-500 dark:text-gray-400 
          max-w-2xl mb-10 text-lg
        ">
          Nexus helps you organize your team, assign tasks, and track progress —
          all in one simple and powerful platform.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={() => navigate("/about")}
            className="
              px-6 py-3 rounded-xl font-medium transition

              bg-white border border-gray-200 text-gray-900 hover:bg-gray-100
              dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700
            "
          >
            Know More
          </button>

          <button
            onClick={() => navigate("/login")}
            className="
              px-6 py-3 rounded-xl font-medium text-white transition
              bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90
            "
          >
            Get Started
          </button>

        </div>

      </div>
    </>
  );
}

export default Home;