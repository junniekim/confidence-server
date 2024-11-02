import express, { json } from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
const app = express();
app.use(json());

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
