require("dotenv").config();

const { Router } = require("express");
const userRouter = Router();

const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");

const { userModel, courseModel, purchaseModel } = require("../db");

// ---------------- SIGNUP ----------------
userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  await userModel.create({
    email,
    password,
    firstName,
    lastName,
  });

  res.json({ message: "Signup succeeded" });
});


// ---------------- SIGNIN ----------------
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });

  if (!user) {
    return res.status(403).json({ message: "Incorrect credentials" });
  }

  const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);
  res.json({ token });
});

// ---------------- PURCHASE COURSE ----------------
userRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ message: "courseId is required" });
  }

  // prevent duplicate purchase
  const alreadyBought = await purchaseModel.findOne({
    userId,
    courseId,
  });

  if (alreadyBought) {
    return res.status(400).json({ message: "Course already purchased" });
  }

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({ message: "Course purchased successfully" });
});

// ---------------- GET PURCHASES ----------------
userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;

  // 1. find purchases
  const purchases = await purchaseModel.find({ userId });

  // 2. extract courseIds
  const courseIds = purchases.map(p => p.courseId);

  // 3. fetch courses
  const coursesData = await courseModel.find({
    _id: { $in: courseIds },
  });

  res.json({
    purchases,
    coursesData,
  });
});

module.exports = {
  userRouter,
};
