import express from "express";
const router = express.Router();

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
  console.log(new Date());
  console.log("Sign up - Success");
  // Update it so that it inserts and send back the id
  res.status(200).json({
    message: "Connection successful and data transfer successful.",
    data: {
      id: 1,
      firstName: "Jun",
      lastName: "Kim",
    },
  });
});

router.post("/signin", async (req, res) => {
  const { emailAddress, password } = req.body;
  // Update it so that it inserts and send back the id
  console.log(new Date());
  console.log("Sign In - Success");
  res.status(200).json({
    message: "Connection successful and data transfer successful.",
    data: {
      id: 2,
      firstName: "Jun",
      lastName: "Kim",
    },
  });
});

export default router;
