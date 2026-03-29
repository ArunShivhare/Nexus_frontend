import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <PublicNavbar />

      <div className="
        min-h-screen px-6 py-16 space-y-16

        bg-gradient-to-br from-purple-50 via-white to-blue-50
        dark:from-black dark:via-gray-900 dark:to-black
      ">

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="
            text-4xl md:text-5xl font-bold mb-4
            text-gray-900 dark:text-white
          ">
            About{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Nexus
            </span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Nexus is a modern team management platform designed to simplify
            collaboration, task assignment, and productivity tracking.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
            <h3 className="font-semibold text-lg mb-2">👑 Role-Based Access</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Leaders manage teams and assign tasks, while members track and complete them.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
            <h3 className="font-semibold text-lg mb-2">📋 Task Management</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Assign, track, and update task status with real-time visibility.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
            <h3 className="font-semibold text-lg mb-2">📊 Analytics</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Monitor team performance with task insights and progress tracking.
            </p>
          </div>

        </div>

        {/* HOW IT WORKS */}
        <div className="max-w-5xl mx-auto text-center space-y-6">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How It Works ⚙️
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border">
              <h4 className="font-medium mb-2">1. Login</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sign in using Google as a leader or member.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border">
              <h4 className="font-medium mb-2">2. Manage</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Leaders add members and assign tasks.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border">
              <h4 className="font-medium mb-2">3. Track</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Members update task status and track progress.
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to get started?
          </h2>

          <a
            href="/login"
            className="
              inline-block px-6 py-3 rounded-xl text-white font-medium
              bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90
            "
          >
            Start Now 🚀
          </a>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default About;