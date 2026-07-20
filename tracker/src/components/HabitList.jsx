import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PlusCircle,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ChevronDown,
  BookOpen,
  Dumbbell,
  Droplets,
  Brain,
  Code,
  Coffee,
  Moon,
  Target,
  NotebookPen,
  HeartPulse,
  Music,
  Briefcase,
  BookMarked,
  Utensils,
  Leaf,
  Laptop,
  Sun,
  Clock3,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const colors = [
  "from-blue-200 to-blue-100",
  "from-amber-200 to-yellow-100",
  "from-green-200 to-emerald-100",
  "from-pink-200 to-rose-100",
  "from-purple-200 to-violet-100",
];

const iconMap = {
  Sparkles,
  BookOpen,
  Dumbbell,
  Droplets,
  Brain,
  Code,
  Coffee,
  Moon,
  Target,
  NotebookPen,
  HeartPulse,
  Music,
  Briefcase,
  BookMarked,
  Utensils,
  Leaf,
  Laptop,
  Sun,
  Clock3,
  Flame,
};

const iconChoices = [
  "Sparkles",
  "BookOpen",
  "Dumbbell",
  "Droplets",
  "Brain",
  "Code",
  "Coffee",
  "Moon",
  "Target",
  "NotebookPen",
  "HeartPulse",
  "Music",
  "Briefcase",
  "BookMarked",
  "Utensils",
  "Leaf",
  "Laptop",
  "Sun",
  "Clock3",
  "Flame",
];

export default function HabitList({
  habits = [],
  onAdd,
}) {
  const [name, setName] =
    useState("");
  const [selectedIcon, setSelectedIcon] =
    useState("Sparkles");
  const [showIcons, setShowIcons] =
    useState(false);
  const [loading, setLoading] =
    useState(true);
  const [toastMessage, setToastMessage] =
    useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const SelectedIcon =
    iconMap[selectedIcon];

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    await onAdd(
      name,
      selectedIcon
    );

    setName("");
    setSelectedIcon("Sparkles");
    setShowIcons(false);
  };

  useEffect(() => {
    setLoading(false);
  }, [habits]);

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(
        location.state.toastMessage
      );

      const timer = setTimeout(() => {
        setToastMessage("");
        navigate(location.pathname, {
          replace: true,
        });
      }, 3000);

      return () =>
        clearTimeout(timer);
    }
  }, [
    location.state,
    location.pathname,
    navigate,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 px-4 py-3 font-poppins relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-[120px] opacity-20" />
      <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-300 rounded-full blur-[140px] opacity-20" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-300 rounded-full blur-[140px] opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-5"
        >
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl px-4 py-1.5 rounded-full shadow-md mb-5">
            <Sparkles
              className="text-indigo-500"
              size={18}
            />
            <span className="text-sm font-medium text-gray-700">
              Build consistency daily
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            My Habits
          </h1>

          <p className="mt-4 text-gray-500 text-base">
            Small daily actions create massive
            long-term results ✨
          </p>

          <div className="mt-3 flex justify-center gap-4 flex-wrap">
            <div className="bg-white shadow-md px-5 py-2 rounded-full text-sm font-medium text-gray-700">
              {habits.length} Habits
            </div>

            <div className="bg-white shadow-md px-5 py-2 rounded-full text-sm font-medium text-gray-700">
              Stay Consistent 🔥
            </div>
          </div>
        </motion.div>

        {/* Add Habit */}
        <motion.form
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          onSubmit={handleAdd}
          className="mx-auto max-w-3xl relative mb-10"
        >
          <div className="bg-white/70 backdrop-blur-2xl border border-white shadow-2xl rounded-3xl p-4 flex items-center gap-3">
            {/* Icon button */}
            <button
              type="button"
              onClick={() =>
                setShowIcons(
                  !showIcons
                )
              }
              className="shrink-0 px-4 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg flex items-center gap-2 hover:scale-105 transition"
            >
              <SelectedIcon size={22} />
              <ChevronDown size={18} />
            </button>

            {/* Input */}
            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Start a new habit..."
              className="flex-1 bg-white/70 h-14 rounded-2xl px-5 text-gray-700 placeholder:text-gray-400 outline-none text-lg"
            />

            {/* Add */}
            <button
              type="submit"
              className="h-14 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center gap-2 shadow-lg hover:scale-105 transition"
            >
              <PlusCircle size={20} />
              Add
            </button>
          </div>

          {/* Popup icon picker */}
          <AnimatePresence>
            {showIcons && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.96,
                }}
                className="absolute left-0 right-0 mt-3 bg-white/90 backdrop-blur-2xl border border-white shadow-2xl rounded-3xl p-4 z-30"
              >
                <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                  {iconChoices.map(
                    (
                      iconName
                    ) => {
                      const Icon =
                        iconMap[
                          iconName
                        ];

                      const active =
                        selectedIcon ===
                        iconName;

                      return (
                        <button
                          key={
                            iconName
                          }
                          type="button"
                          onClick={() => {
                            setSelectedIcon(
                              iconName
                            );
                            setShowIcons(
                              false
                            );
                          }}
                          className={`h-12 rounded-2xl flex items-center justify-center transition-all border ${
                            active
                              ? "bg-indigo-500 text-white border-indigo-500 scale-105 shadow-lg"
                              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                          }`}
                        >
                          <Icon
                            size={
                              20
                            }
                          />
                        </button>
                      );
                    }
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="col-span-full text-center text-gray-400 italic py-16 text-lg">
              Loading your habits...
            </p>
          ) : habits.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <div className="text-6xl mb-4">
                🌱
              </div>
              <h3 className="text-2xl font-bold text-gray-700">
                Start your first habit
              </h3>
              <p className="text-gray-500 mt-2">
                Tiny habits become life
                changing routines.
              </p>
            </div>
          ) : (
            habits.map(
              (habit, i) => {
                const CardIcon =
                  iconMap[
                    habit.icon
                  ] ||
                  Sparkles;

                return (
                  <motion.div
                    key={
                      habit._id
                    }
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        i * 0.08,
                      duration: 0.45,
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.03,
                    }}
                    onClick={() =>
                      navigate(
                        `/habit/${habit._id}`
                      )
                    }
                    className={`relative overflow-hidden bg-gradient-to-br ${
                      colors[
                        i %
                          colors.length
                      ]
                    } p-5 rounded-3xl shadow-xl border border-white/40 cursor-pointer group`}
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-white/30 rounded-full blur-3xl" />

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-white/60 backdrop-blur-md flex items-center justify-center mb-4 text-gray-700 shadow">
                        <CardIcon size={24} />
                      </div>

                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {habit.title}
                      </h2>

                      <p className="text-gray-600 text-sm">
                        Track progress daily
                      </p>

                      <div className="mt-7 flex justify-between items-center">
                        <span className="bg-white/70 backdrop-blur-md px-4 py-1 rounded-full text-xs font-medium text-gray-700">
                          Active
                        </span>

                        <ArrowRight className="group-hover:translate-x-1 transition-transform text-gray-700" />
                      </div>
                    </div>
                  </motion.div>
                );
              }
            )
          )}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl px-6 py-4 text-gray-800 w-[340px] max-w-full">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-2 text-white">
                <CheckCircle size={22} />
              </div>

              <div>
                <p className="font-semibold">
                  Success
                </p>
                <p className="text-sm text-gray-600">
                  {toastMessage}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}