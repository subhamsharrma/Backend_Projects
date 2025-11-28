const { Router } = require("express");
const adminRouter = Router();

// POST /api/v1/admin/signup
adminRouter.get("/signup", (req, res) => {
  res.json({
    message: "Admin signup endpoint",
  });
});

// POST /api/v1/admin/signin
adminRouter.get("/signin", (req, res) => {
  res.json({
    message: "Admin signin endpoint",
  });
});

module.exports = { adminRouter };
