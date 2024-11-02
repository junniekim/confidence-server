import express, { json } from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import mongoose from "mongoose";
const app = express();
app.use(json());
const connectionString = "mongodb://localhost:27017/Confidence";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//Sanity Check
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
// Use the user routes
app.use("/user", userRoutes);
