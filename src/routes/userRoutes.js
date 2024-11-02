import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import User from "../models/User.js";

router.post("/signup", async (req, res) => {
  const { firstName, lastName, emailAddress, password, birthday, phoneNumber } =
    req.body;

  if (!firstName || !birthday || !lastName || !emailAddress || !password) {
    return res.status(400).json({
      error:
        "Please provide first Name, last Name, email address, and password.",
    });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const newUser = new User({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
      birthday,
      phoneNumber,
    });
    await newUser.save();
    console.log(new Date());
    console.log("Sign up - Success");
    res.status(201).json({
      message: "User created successfully.",
      data: {
        id: newUser._id,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  const { emailAddress, password } = req.body;
  console.log(emailAddress, password);
  try {
    const user = await User.findOne({ emailAddress: emailAddress });

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(new Date());
      console.log("Sign In - Success");
      res.status(200).json({
        message: "User located successfully",
        data: {
          id: user._id,
        },
      });
    } else {
      return res.status(400).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/data/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findOne({ _id: id });
    console.log(user);
    if (user) {
      console.log(new Date());
      console.log("Fetching User Data - Success");
      res.status(200).json({
        message: "User located successfully",
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday,
          phoneNumber: user.phoneNumber,
          emailAddress: user.emailAddress,
          bodyWeightHistory: user.bodyWeightHistory,
        },
      });
    } else {
      return res
        .status(400)
        .json({ error: "Something went wrong. Please try again" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/data/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, birthday, phoneNumber, emailAddress, password } =
    req.body;
  if (!firstName || !birthday || !lastName || !emailAddress || !password) {
    return res.status(400).json({
      error:
        "Please provide first Name, last Name, email address, and password.",
    });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        birthday,
        phoneNumber,
        emailAddress,
        password: hashedPassword,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete user
router.delete("/data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
