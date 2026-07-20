import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowDialog(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      setShowDialog(false);
      // ✅ Redirect to Landing page
      navigate("/", {
        state: { toastMessage: "👋 Logged out successfully!" },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-5 px-8 shadow-md sticky top-0 z-50 font-poppins">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/app" className="flex items-center gap-2">
          <Sparkles size={26} />
          <span className="text-2xl font-bold tracking-tight">HabitFlow</span>
        </Link>

        <nav className="flex gap-6 items-center text-lg">
          <Link
            to="/app"
            className={
              location.pathname === "/" ? "underline font-medium" : "font-medium"
            }
          >
            Home
          </Link>

          {user && (
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 text-white transition-all duration-200 font-medium shadow-sm"
            >
              <LogOut size={18} /> <span>Logout</span>
            </button>
          )}
        </nav>
      </div>

      {/* ✅ Logout Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-[90%] max-w-sm text-center transform transition-all scale-100 animate-popup">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Log out of HabitFlow?
            </h2>
            <p className="text-gray-600 mb-6 text-[15px]">
              You can log in again anytime using your account credentials.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmLogout}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-md"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popup {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        .animate-popup {
          animation: popup 0.25s ease-out;
        }
      `}</style>
    </header>
  );
}
