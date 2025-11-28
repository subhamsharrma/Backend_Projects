const { Router } = require("express");
const userRouter = Router();

// POST /api/v1/user/signup
userRouter.post("/signup", (req, res) => {
  res.json({
    message: "Signup endpoint",
  });
});

// POST /api/v1/user/signin
userRouter.post("/signin", (req, res) => {
  res.json({
    message: "Signin endpoint",
  });
});

// GET /api/v1/user/purchases
userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "User purchases endpoint",
  });
});

module.exports = {
  userRouter,
};
