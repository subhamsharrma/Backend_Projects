 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const mongourl = "mongodb+srv://thinkpositive:alluallu@subhamsharrmadb.s56xe89.mongodb.net/current";




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
const User1 = new userModel({
  email: "rahul.verma@example.com",
  password: "rahul@2024",
  firstName: "Rahul",
  lastName: "Verma",
});

const User2 = new userModel({
  email: "ananya.singh@example.com",
  password: "ananya#123",
  firstName: "Ananya",
  lastName: "Singh",
});

const User3 = new userModel({
  email: "arjun.patel@example.com",
  password: "arjun789",
  firstName: "Arjun",
  lastName: "Patel",
});
 

// -------------------------------------------------------------------------------
async function saveUsersInOrder() {
  await User1.save();
  console.log("Dummy user1 added");

  await User2.save();
  console.log("Dummy user2 added");

  await User3.save();
  console.log("Dummy user3 added");
}

saveUsersInOrder();


  // -------------------------------------------------------------------------------



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






