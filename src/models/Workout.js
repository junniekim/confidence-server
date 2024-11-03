import mongoose from "mongoose";
const workoutSchema = new mongoose.Schema({
  dateentered: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  custom: {
    type: Boolean,
    default: false,
  },
  target: {
    type: [String],
    required: true,
  },
  cardio: {
    type: Boolean,
    required: true,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
