import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import User from "../models/User.js";
// Route for creating a new account
router.post("/signup", async (req, res) => {
  const { firstName, lastName, emailAddress, password, birthday, phoneNumber } =
    req.body;

  // Check for required fields
  if (!firstName || !lastName || !emailAddress || !password) {
    return res.status(400).json({
      error:
        "Please provide first Name, last Name, email address, and password.",
    });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(password, hashedPassword);
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
        firstName: newUser.firstName,
        lastName: newUser.lastName,
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
          firstName: user.firstName,
          lastName: user.lastName,
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

export default router;
