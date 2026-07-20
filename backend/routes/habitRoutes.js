import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createHabit,
  getHabits,
  toggleHabit,
  getHabitMonth,
  getHabitStats,
  deleteHabit,
  updateHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createHabit)
  .get(protect, getHabits);

router.patch("/:id", protect, updateHabit);
router.patch("/:id/toggle", protect, toggleHabit);

router.get("/:id/calendar", protect, getHabitMonth);
router.get("/:id/stats", protect, getHabitStats);

router.delete("/:id", protect, deleteHabit);

export default router;