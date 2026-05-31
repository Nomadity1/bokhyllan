const jwt = require("jsonwebtoken");

function optionalToken(req, _res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
  } catch (_error) {
    // Invalid/expired token should not block guest checkout.
    req.user = null;
  }

  return next();
}

module.exports = optionalToken;
