import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getHabitCalendar,
  getHabitStats,
  toggleHabit,
  updateHabit,
} from "../api";
import {
  Pencil, Check, X, Sparkles, BookOpen, Dumbbell, Droplets,
  Brain, Code, Coffee, Moon, Target, NotebookPen, HeartPulse,
  Music, Briefcase, BookMarked, Utensils, Leaf, Laptop, Sun,
  Clock3, Flame,
} from "lucide-react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const iconMap = {
  Sparkles, BookOpen, Dumbbell, Droplets, Brain, Code, Coffee,
  Moon, Target, NotebookPen, HeartPulse, Music, Briefcase,
  BookMarked, Utensils, Leaf, Laptop, Sun, Clock3, Flame,
};

const iconChoices = [
  "Sparkles", "BookOpen", "Dumbbell", "Droplets", "Brain", "Code",
  "Coffee", "Moon", "Target", "NotebookPen", "HeartPulse", "Music",
  "Briefcase", "BookMarked", "Utensils", "Leaf", "Laptop", "Sun",
  "Clock3", "Flame",
];

export default function HabitView({ habits, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const todayObj = new Date();
  const realToday = todayObj.getDate();
  const realMonth = todayObj.getMonth();
  const realYear = todayObj.getFullYear();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [habit, setHabit] = useState(null);
  const [days, setDays] = useState([]);
  const [stats, setStats] = useState({ longestStreak: 0, currentStreak: 0, totalCompleted: 0 });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editIcon, setEditIcon] = useState("Sparkles");

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  useEffect(() => {
    const foundHabit = habits.find((h) => h._id === id);
    if (!foundHabit) { navigate("/app"); return; }
    setHabit(foundHabit);
    setEditTitle(foundHabit.title);
    setEditIcon(foundHabit.icon || "Sparkles");
  }, [id, habits, navigate]);

  useEffect(() => { fetchCalendar(); fetchStats(); }, [currentDate]);

  const fetchCalendar = async () => {
    try {
      const logs = await getHabitCalendar(id, month + 1, year);
      const completedSet = new Set(
        logs.filter((log) => log.completed).map((log) => Number(log.date.split("-")[2]))
      );
      setDays(Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, completed: completedSet.has(i + 1) })));
    } catch (err) { console.error(err); }
  };

  const fetchStats = async () => {
    try { setStats(await getHabitStats(id)); } catch (err) { console.error(err); }
  };

  const handleToggle = async (day) => {
    if (month !== realMonth || year !== realYear || day !== realToday) return;
    try {
      await toggleHabit(id, new Date().toISOString().split("T")[0]);
      fetchCalendar(); fetchStats();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async () => {
    try { await onDelete(id); navigate("/app"); } catch (err) { console.error(err); }
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    try {
      setHabit(await updateHabit(id, editTitle, editIcon));
      setEditing(false);
    } catch (err) { console.error(err); }
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) calendarCells.push(null);
  calendarCells.push(...days);

  if (!habit) return <div className="h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  const HabitIcon = iconMap[habit.icon] || Sparkles;
  const EditIcon = iconMap[editIcon] || Sparkles;

  return (
    <div className="h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-3">
      <div className="max-w-8xl mx-auto h-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">

        {/* LEFT */}
        <div className="bg-white/85 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col gap-3">

          <button
            onClick={() => navigate("/app")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 transition-all text-sm"
          >
            ← Back
          </button>

          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-gray-400 font-semibold mb-2">
              Habit Tracker
            </p>

            {!editing ? (
              <>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow mb-2">
                  <HabitIcon size={20} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent break-words">
                  {habit.title}
                </h1>
                <button
                  onClick={() => setEditing(true)}
                  className="mt-2 flex items-center gap-1.5 text-indigo-600 text-sm font-medium hover:text-indigo-700"
                >
                  <Pencil size={13} /> Edit Habit
                </button>
              </>
            ) : (
              <>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow mb-2">
                  <EditIcon size={20} />
                </div>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 text-sm font-semibold"
                />
                <div className="grid grid-cols-5 gap-1.5 mt-3">
                  {iconChoices.map((iconName) => {
                    const Icon = iconMap[iconName];
                    const active = editIcon === iconName;
                    return (
                      <button
                        key={iconName}
                        onClick={() => setEditIcon(iconName)}
                        className={`h-9 rounded-xl flex items-center justify-center border transition ${
                          active ? "bg-indigo-500 text-white border-indigo-500" : "bg-white border-gray-200 text-gray-600"
                        }`}
                      >
                        <Icon size={15} />
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl flex justify-center items-center gap-1.5 text-sm">
                    <Check size={14} /> Save
                  </button>
                  <button onClick={() => setEditing(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-xl flex justify-center items-center gap-1.5 text-sm">
                    <X size={14} /> Cancel
                  </button>
                </div>
              </>
            )}

            <p className="text-gray-400 mt-2 text-xs">Small progress every day builds big results.</p>
          </div>

          {/* Stats */}
          <div className="space-y-2 flex-1">
            <div className="bg-indigo-50 rounded-2xl p-3">
              <p className="text-xs text-gray-500">Longest Streak</p>
              <h2 className="text-2xl font-bold text-indigo-600">{stats.longestStreak}</h2>
            </div>
            <div className="bg-green-50 rounded-2xl p-3">
              <p className="text-xs text-gray-500">Current Streak</p>
              <h2 className="text-2xl font-bold text-green-600">{stats.currentStreak}</h2>
            </div>
            <div className="bg-pink-50 rounded-2xl p-3">
              <p className="text-xs text-gray-500">Total Completed</p>
              <h2 className="text-2xl font-bold text-pink-600">{stats.totalCompleted}</h2>
            </div>
          </div>

          <button
            onClick={() => setShowDeleteDialog(true)}
            className="py-2 rounded-xl bg-red-50 hover:bg-red-500 border border-red-100 hover:border-red-500 transition group text-sm"
          >
            <span className="font-semibold text-red-500 group-hover:text-white transition-colors">Delete Habit</span>
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-white/85 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col">

          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="px-4 py-1.5 rounded-xl bg-gray-50 text-sm">← Prev</button>
            <h2 className="text-lg font-bold text-gray-800">
              {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
            </h2>
            <button onClick={nextMonth} className="px-4 py-1.5 rounded-xl bg-gray-50 text-sm">Next →</button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-[10px] font-bold uppercase tracking-wider text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 flex-1">
            {calendarCells.map((d, index) => {
              if (!d) return <div key={`empty-${index}`} />;

              const isCurrentMonth = month === realMonth && year === realYear;
              const isToday = isCurrentMonth && d.day === realToday;
              const isPast = isCurrentMonth && d.day < realToday;

              return (
                <div
                  key={`${year}-${month}-${d.day}-${index}`}
                  onClick={() => isToday && handleToggle(d.day)}
                  className={`rounded-2xl flex items-center justify-center text-sm font-semibold min-h-[52px] transition ${
                    d.completed
                      ? "bg-green-300 text-green-900 line-through"
                      : isPast
                      ? "bg-red-100 text-red-700"
                      : isToday
                      ? "bg-blue-100 border-2 border-blue-500 cursor-pointer hover:scale-[1.03]"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {d.day}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-2xl text-center w-[90%] max-w-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Delete this habit?</h2>
            <p className="text-gray-500 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm">
                Yes, Delete
              </button>
              <button onClick={() => setShowDeleteDialog(false)} className="bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-xl text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}