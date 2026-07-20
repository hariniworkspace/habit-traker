import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-blue-100 via-indigo-50 to-pink-100 px-10 md:px-24 font-poppins">
      {/* Left Section */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Build Better <span className="text-indigo-600">Habits</span> <br />
          Every Single Day 🌸
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          Track your progress, stay consistent, and achieve your goals with
          HabitFlow — your personal daily growth companion.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-medium inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          Get Started <ArrowRight size={20} />
        </button>
      </div>

      {/* Right Section (Illustration Style) */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-center relative">
        <div className="bg-white rounded-3xl shadow-xl p-8 relative w-[90%] md:w-[80%]">
          <div className="grid grid-cols-7 gap-4">
            {[...Array(28)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full ${
                  i % 5 === 0
                    ? "bg-indigo-500"
                    : i % 3 === 0
                    ? "bg-pink-400"
                    : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
          <div className="absolute bottom-2 right-4 text-sm text-gray-500 italic">
            Habit Progress
          </div>
        </div>

        {/* Floating abstract shapes */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 -right-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      </div>
    </div>
  );
}
