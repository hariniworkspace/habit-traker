import Habit from "../models/Habit.js";
import HabitLog from "../models/HabitLog.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { isToday } from "../utils/dateHelpers.js";
import calculateStreak from "../utils/calculateStreak.js";

const createHabit = asyncHandler(async (req, res) => {
  const { title, icon, color } = req.body;

  const habit = await Habit.create({
    user: req.user._id,
    title,
    icon: icon || "Sparkles",
    color,
  });

  res.status(201).json(habit);
});

const getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find({
    user: req.user._id,
  }).sort("-createdAt");

  res.json(habits);
});

/* NEW */
const updateHabit = asyncHandler(async (req, res) => {
  const { title, icon } = req.body;

  const habit = await Habit.findById(
    req.params.id
  );

  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }

  habit.title =
    title || habit.title;

  habit.icon =
    icon || habit.icon;

  const updated =
    await habit.save();

  res.json(updated);
});

const toggleHabit = asyncHandler(async (req, res) => {
  const { date } = req.body;

  if (!isToday(date)) {
    res.status(400);
    throw new Error(
      "You can edit only today's habit"
    );
  }

  const habit = await Habit.findById(
    req.params.id
  );

  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }

  let log = await HabitLog.findOne({
    habit: habit._id,
    date,
  });

  if (log) {
    log.completed = !log.completed;
    await log.save();
  } else {
    log = await HabitLog.create({
      habit: habit._id,
      date,
      completed: true,
    });
  }

  res.json(log);
});

const getHabitMonth = asyncHandler(async (req, res) => {
  const month = Number(req.query.month);
  const year = Number(req.query.year);

  const monthStr = String(month).padStart(
    2,
    "0"
  );

  const start = `${year}-${monthStr}-01`;

  const lastDay = new Date(
    year,
    month,
    0
  ).getDate();

  const end = `${year}-${monthStr}-${String(
    lastDay
  ).padStart(2, "0")}`;

  const logs = await HabitLog.find({
    habit: req.params.id,
    date: {
      $gte: start,
      $lte: end,
    },
  });

  res.json(logs);
});

const getHabitStats = asyncHandler(async (req, res) => {
  const logs = await HabitLog.find({
    habit: req.params.id,
  });

  const stats = calculateStreak(logs);

  res.json(stats);
});

const deleteHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(
    req.params.id
  );

  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }

  await HabitLog.deleteMany({
    habit: habit._id,
  });

  await habit.deleteOne();

  res.json({
    message: "Habit deleted",
  });
});

export {
  createHabit,
  getHabits,
  updateHabit,
  toggleHabit,
  getHabitMonth,
  getHabitStats,
  deleteHabit,
};