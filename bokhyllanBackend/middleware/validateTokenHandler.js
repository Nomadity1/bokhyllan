// MIDDLEWARE FÖR ATT VALIDERA JWT-TOKEN I AUTHORIZATION
// IMPORT OF PACKAGES & DEPENDENCIES
const jwt = require("jsonwebtoken");

// FUNCTION to validate token from AUTHORIZATION header (BEARER) in the request
function validateToken(req, res, next) {
  // CONTROL both lowercase and uppercase "authorization" for flexibility
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Not authorised. No token provided" });
  }

  // Treat everything as a vector: ["Bearer", "tokenString"]
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorised. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorised." });
  }
}

// EXPORT
module.exports = validateToken;
