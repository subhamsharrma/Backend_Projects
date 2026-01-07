const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schemas.Types.ObjectIdasd;

const mongourl = "mongodb+srv://thinkpositive:alluallu@subhamsharrmadb.s56xe89.mongodb.net/newBD";

// USER
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

// ADMIN
const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

// COURSE
const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

// PURCHASE (SEPARATE COLLECTION)
const purchaseSchema = new Schema({
  userId: { type: ObjectId, ref: "user" },
  courseId: { type: ObjectId, ref: "course" },
});

// MODELS
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

// CONNECT
mongoose
  .connect(mongourl)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
