import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import Workout from "../models/Workout.js";
router.get("/workouts", (req, res) => {
  // Logic for getting workouts
});
export default router;
