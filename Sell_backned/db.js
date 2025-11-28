const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const mongourl = "mongodb+srv://thinkpositive:alluallu@subhamsharrmadb.s56xe89.mongodb.net/learncode";

// 1. Define Schemas
const userSchema = new Schema({
  email: { type: String, unique: false},
  password: String,
  firstName: String,
  lastName: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: false},
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

// 2. Create Models
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

// 3. Connect to MongoDB
mongoose
  .connect(mongourl)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// adding dummy course (REALISTIC)
const REalcourse = new courseModel({
  title: "Master Full-Stack Development",
  description:
    "Learn Node.js, Express, MongoDB, and modern frontend fundamentals to build production-ready applications.",
  price: 199.0,
  imageUrl: "https://example.com/fullstack-course.jpg",
  creatorId: new ObjectId(),
});

// DEMO USERS (all meaningful)
const userDemo = new userModel({
  email: "rahul.verma@example.com",
  password: "rahul@2024",
  firstName: "Rahul",
  lastName: "Verma",
});

const userdemo2 = new userModel({
  email: "ananya.singh@example.com",
  password: "ananya#123",
  firstName: "Ananya",
  lastName: "Singh",
});

const userdemo3 = new userModel({
  email: "arjun.patel@example.com",
  password: "arjun789",
  firstName: "Arjun",
  lastName: "Patel",
});

const userdemo4 = new userModel({
  email: "kavya.shah@example.com",
  password: "kavya456",
  firstName: "Kavya",
  lastName: "Shah",
});

const userdemo34 = new userModel({
  email: "devansh.mehra@example.com",
  password: "devansh2025",
  firstName: "Devansh",
  lastName: "Mehra",
});

const userdemo343 = new userModel({
  email: "subham.sharma@example.com",
  password: "subham123",
  firstName: "Subham",
  lastName: "Sharma",
});

// let a user name with allua in user table 
const userdemo3443 = new userModel({
  email: "alluallu@example.com",
  password: "allu@2024",
  firstName: "Allu",
  lastName: "Arjun",
});


userdemo3443.save();
userdemo343.save();
userdemo34.save();
userdemo4.save();


userdemo2
  .save()
  .then(() => console.log("Dummy user2 added"))
  .catch((err) => console.error("Error adding dummy user2:", err));

userDemo
  .save()
  .then(() => console.log("Dummy user added"))
  .catch((err) => console.error("Error adding dummy user:", err));

userdemo3
  .save()
  .then(() => console.log("Dummy user3 added"))
  .catch((err) => console.error("Error adding dummy user3:", err));

REalcourse
  .save()
  .then(() => console.log("Dummy course added"))
  .catch((err) => console.error("Error adding dummy course:", err));

// 4. Export Models
module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};






