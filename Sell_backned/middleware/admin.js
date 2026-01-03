const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminRouter = Router();
const { JWT_ADMIN_PASSWORD } = require("../config");


// bycypt // zod // json webtoken jwt


const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    req.userid = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { adminMiddleware };