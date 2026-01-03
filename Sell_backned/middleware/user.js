const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

const userMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    req.userId = decoded.id; // 👈 FIX: store only id
    next(); // 👈 allow route to run
    
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { userMiddleware };
