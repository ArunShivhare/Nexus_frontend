import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PublicNavbar from "../components/PublicNavbar";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (role) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post(
        "https://nexus-backend-dioy.onrender.com/api/users/save",
        {
          name: user.displayName,
          email: user.email,
          role: role,
          firebaseUID: user.uid,
        },
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PublicNavbar />

      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

        <div className="w-full max-w-[440px] z-10">
          {/* Back Link */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-8 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Back to home
          </button>

          <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
            {/* Logo & Header */}
            <div className="text-center mb-10">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg shadow-purple-500/30 mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="/favicon.png"
                  className="w-10 h-10"
                  alt="Nexus Logo"
                />
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Choose your portal to continue
              </p>
            </div>

            {/* Role Selection Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => handleLogin("leader")}
                className="group w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">👑</span>
                  <span className="text-lg">Leader Console</span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </button>

              <button
                onClick={() => handleLogin("member")}
                className="group w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">👤</span>
                  <span className="text-lg">Member Area</span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </button>
            </div>

            {/* Decorative Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 dark:text-slate-500 font-semibold tracking-widest">
                  Nexus Security
                </span>
              </div>
            </div>

            {/* Footer Info */}
            <p className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-500 text-center px-4 uppercase tracking-wider">
              Secure SSO enabled. By signing in, you agree to our
              <a href="#" className="underline hover:text-purple-500 mx-1">
                Terms
              </a>{" "}
              &
              <a href="#" className="underline hover:text-purple-500 mx-1">
                Privacy
              </a>
              .
            </p>
          </div>

          {/* Helper Footer Link */}
          <p className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm">
            Don't have an account?{" "}
            <button className="text-purple-600 dark:text-purple-400 font-bold hover:underline">
              Contact Admin
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
