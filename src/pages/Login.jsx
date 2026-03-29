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

      const res = await axios.post("https://nexus-backend-dioy.onrender.com/api/users/save", {
        name: user.displayName,
        email: user.email,
        role: role,
        firebaseUID: user.uid,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PublicNavbar />

      <div className="
        min-h-[90vh] flex items-center justify-center px-4
        bg-linear-to-br from-purple-50 via-white to-blue-50
        dark:from-black dark:via-gray-900 dark:to-black
      ">

        <div className="
          w-full max-w-md p-8 rounded-2xl shadow-sm border transition
          bg-white border-gray-200
          dark:bg-gray-900/80 dark:border-gray-800 dark:backdrop-blur-md
        ">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-blue-500 mb-4">
              <img src="/favicon.png" className="w-8 h-8" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to Nexus
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Manage teams. Assign tasks. Stay productive.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">

            <button
              onClick={() => handleLogin("leader")}
              className="w-full flex items-center justify-between px-5 py-3 rounded-xl 
              bg-linear-to-r from-purple-600 to-blue-500 text-white font-medium hover:opacity-90"
            >
              <span>Login as Leader 👑</span>
              <span>→</span>
            </button>

            <button
              onClick={() => handleLogin("member")}
              className="w-full flex items-center justify-between px-5 py-3 rounded-xl 
              bg-gray-100 text-gray-900 hover:bg-gray-200
              dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              <span>Login as Member 👤</span>
              <span>→</span>
            </button>

          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="text-gray-500 text-xs">Google Authentication</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our terms & privacy policy.
          </p>

        </div>

      </div>
    </>
  );
}

export default Login;