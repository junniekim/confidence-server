import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: false,
  },
  emailAddress: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  bodyWeightHistory: {
    type: [
      {
        recordedOn: {
          type: Date,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});
// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
