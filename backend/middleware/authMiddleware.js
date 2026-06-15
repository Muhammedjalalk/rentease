
require('./uploadMiddleware')
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  console.log("HEADER:", token); // debug

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  // 🔥 Remove Bearer
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, "secretkey");

    console.log("DECODED:", decoded); // debug

    req.user = decoded; // must contain { id: ... }
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;