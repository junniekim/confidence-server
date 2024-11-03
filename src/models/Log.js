import mongoose from "mongoose";
const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
    required: true,
  },
  weight: {
    type: Number,
    default: 0,
  },
  rep: {
    type: Number,
    default: 0,
  },
  set: {
    type: Number,
    default: 0,
  },
  minute: {
    type: Number,
    default: 0,
  },
  recordedOn: {
    type: Date,
    required: true,
  },
});
const Log = mongoose.model("Log", logSchema);

export default Log;
