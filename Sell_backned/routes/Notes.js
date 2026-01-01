const { Router } = require("express");
const notesRouter = Router();

// POST /api/v1/Notes
notesRouter.post("/add", (req, res) => {
  // You would expect the user to pay you money here
  res.json({
    message: "Notes endpoint",

  });
});

notesRouter.get("/", (req, res) => {
  res.json({
    message: "Get Notes endpoint",
  });
});


module.exports = {
  notesRouter,
};

