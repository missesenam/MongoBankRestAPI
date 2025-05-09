const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  try {
    // extract the token from header and token
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ message: "User Unauthenticated" });
    }
    const token = authorizationHeader.split(" ")[1];
    // verify token with jwt
    const decodetoken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodetoken) {
      throw new Error("unauthorized");
    }
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuth;
