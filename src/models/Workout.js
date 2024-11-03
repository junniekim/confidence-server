import mongoose from "mongoose";
const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  target: {
    type: [String],
    required: true,
  },
  cardio: {
    type: Boolean,
    required: true,
  },
  picture: {
    type: String,
    require: true,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
