import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();
  const images = ["/member_dashboard.png", "/leader_dashboard.png"];
  const [currentImage, setCurrentImage] = useState(0);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-purple-100">
      {user ? <Navbar user={user} /> : <PublicNavbar />}

      <main className="relative overflow-hidden pt-16 pb-24">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/30 blur-[120px] dark:bg-purple-900/20" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-200/30 blur-[120px] dark:bg-blue-900/20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              v2.0 is now live
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Manage your team <br />
            <span className="bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              without the chaos.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Nexus is the next-gen workspace that brings your tasks, docs, and
            people together. Simple, fast, and surprisingly powerful.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/about")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-slate-600 dark:text-slate-300 rounded-full font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
            >
              View Features
            </button>
          </div>

          {/* Mockup/Visual Element */}
          <div className="relative w-full max-w-5xl px-4 mx-auto group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

            {/* Main Container */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-2 shadow-2xl">
              {/* Inner Dashboard Wrapper - aspect-video keeps it 16:9 */}
              <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 aspect-video overflow-hidden flex flex-col items-center justify-center p-4">
                {/* Label - Reduced margin for mobile */}
                <p className="text-slate-400 text-[10px] sm:text-sm font-mono italic mb-4 sm:mb-8">
                  [ Interactive Dashboard Preview ]
                </p>

                {/* Image Container */}
                <div className="relative w-full max-w-2xl mx-auto">
                  <div
                    className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg 
                        transform transition-transform duration-500
                        scale-110 sm:scale-125 md:scale-150"
                  >
                    <img
                      src={images[currentImage]}
                      alt="dashboard preview"
                      className="w-full h-auto object-cover transition-opacity duration-700 aspect-[16/10]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
