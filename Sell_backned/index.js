

const express = require("express");
const { userRouter } = require("./routes/user");
require("./db");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { notesRouter } = require("./routes/Notes");
const { feedbackRouter } = require("./routes/feedback");
const mongourl = "mongodb+srv://thinkpositive:alluallu@subhamsharrmadb.s56xe89.mongodb.net/current" ; 

const app = express();
app.use(express.json());

// Use Routers

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/Notes", notesRouter); // Notes Router
app.use("/api/v1/feedback", feedbackRouter); // Feedback Router

app.listen(3000, () => {
  console.log("✅ Server running on port 3000");
});
