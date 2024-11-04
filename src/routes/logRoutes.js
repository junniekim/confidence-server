import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Workout from "../models/Workout.js";
import Log from "../models/Log.js";
//Get log for a given user
router.get("/data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const logs = await Log.find({ user: new mongoose.Types.ObjectId(id) });
    res.status(200).json({
      data: logs,
    });
  } catch (error) {
    console.error("Error fetching log:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/data/joined/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const logs = await Log.find({ user: new mongoose.Types.ObjectId(id) });

    const workoutIds = logs
      .map((log) => log.workout)
      .filter((workout) => workout);

    const workouts =
      workoutIds.length > 0
        ? await Workout.find({ _id: { $in: workoutIds } })
        : [];

    const workoutMap = workouts.reduce((map, workout) => {
      map[workout._id] = workout;
      return map;
    }, {});

    const enrichedLogs = logs.map((log) => ({
      ...log.toObject(),
      workout: workoutMap[log.workout] || null,
    }));

    res.status(200).json({
      data: enrichedLogs,
    });
  } catch (error) {
    console.error("Error fetching log:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete all rows for given id and date, and insert all
router.put("/data/:id", async (req, res) => {
  const { id } = req.params;
  const logArray = req.body;
  try {
    const user_id_to_insert = new mongoose.Types.ObjectId(id);
    const recordedOn = logArray[0]?.recordedOn; // Extract the recordedOn date from the first log
    if (!recordedOn) {
      return res.status(400).json({ message: "No recorded date provided." });
    }
    const normalizedRecordedOn = new Date(recordedOn);

    //delete all
    await Log.deleteMany({
      user: user_id_to_insert,
      recordedOn: normalizedRecordedOn,
    });

    //Insert all
    const newLogs = logArray.map((log) => ({
      workout: new mongoose.Types.ObjectId(log.workout),
      weight: log.weight,
      rep: log.rep,
      set: log.set,
      minute: log.minute,
      recordedOn: normalizedRecordedOn,
      user: user_id_to_insert,
    }));
    const insertedLogs = await Log.insertMany(newLogs);
    res
      .status(200)
      .json({ message: "Logs updated successfully.", insertedLogs });
  } catch (error) {
    console.error("Error updating logs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
