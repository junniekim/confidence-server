import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import Workout from "../models/Workout.js";

// Get workout data
router.get("/data", async (req, res) => {
  try {
    const workouts = await Workout.find({});
    if (workouts.length > 0) {
      res.status(200).json({
        message: "Workouts retrieved successfully",
        data: workouts,
      });
    } else {
      res.status(404).json({
        message: "No workouts found",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
