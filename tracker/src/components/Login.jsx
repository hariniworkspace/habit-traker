import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, CheckCircle } from "lucide-react";
import loginIllustration from "../assets/log3.png";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        await register(name, email, password);
        showToast("🎉 Account created successfully!");
      } else {
        await login(email, password);
        showToast("✅ Logged in successfully!");
      }

      setTimeout(() => {
        navigate("/app");
      }, 800);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-pink-200 font-poppins relative">
      <div className="flex flex-col md:flex-row w-[90%] md:w-[80%] lg:w-[70%] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="flex-1 bg-gradient-to-br from-indigo-500 to-pink-400 flex items-center justify-center p-8 relative">
          <img
            src={loginIllustration}
            alt="Login"
            className="w-[80%] max-w-[500px]"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center px-10 py-12 md:px-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {isSignUp
              ? "Create Account"
              : "Welcome Back 👋"}
          </h2>

          <p className="text-gray-500 mb-8">
            {isSignUp
              ? "Start building habits"
              : "Login to continue"}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {isSignUp && (
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-10 py-3"
                />
              </div>
            )}

            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-10 py-3"
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-10 py-3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
            >
              {isSignUp
                ? "Sign Up"
                : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              onClick={() =>
                setIsSignUp(!isSignUp)
              }
              className="text-indigo-600 font-medium"
            >
              {isSignUp
                ? "Login"
                : "Sign Up"}
            </button>
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="flex items-center gap-3 bg-white shadow-xl rounded-2xl px-6 py-4">
            <CheckCircle size={22} />
            <p>{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}