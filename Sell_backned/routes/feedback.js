const express = require("express");
const feedbackRouter = express.Router();

const feedbacks = [];

// 1. POST Route (To Create Feedback)
feedbackRouter.post("/add", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newFeedback = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date(),
  };

  feedbacks.push(newFeedback);

  res.status(201).json({
    status: "success",
    message: "Feedback received!",
    data: newFeedback,
  });
  
});

// 2. GET Route (To Fetch All Feedback)
feedbackRouter.get("/all", (req, res) => {
  res.status(200).json({
    status: "success",
    count: feedbacks.length,
    data: feedbacks, // This sends back the whole list
  });
});

module.exports = { feedbackRouter };
