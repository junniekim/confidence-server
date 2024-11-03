import express from "express";
import mongoose from "mongoose";
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
    res.status(500).json({ error: "Internal1 server error" });
  }
});

router.get("/data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.find({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (workout) {
      res.status(200).json({
        message: "Workouts retrieved successfully",
        data: workout,
      });
    } else {
      res.status(400).json({
        message: "No workout found for given ID",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
