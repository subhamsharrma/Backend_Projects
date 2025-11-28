const { Router } = require("express");
const courseRouter = Router();

// POST /api/v1/course/purchase
courseRouter.post("/purchase", (req, res) => {
  // You would expect the user to pay you money here
  res.json({
    message: "Course purchase endpoint",
  });
});

// GET /api/v1/course/preview
courseRouter.get("/preview", (req, res) => {
  res.json({
    message: "Course preview endpoint",
  });
});

module.exports = {
  courseRouter,
};
