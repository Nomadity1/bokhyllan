// IMPORTS OF PACKAGES & DEPENDENCIES
const express = require("express");
const validateToken = require("../middleware/validateToken");

// IMPORT OF FUNCTIONS IN CONTROLLER
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  currentUser,
} = require("../controllers/userController");

// BUILD EXPRESS ROUTER
const router = express.Router();

// DEFINE ROUTES
// POST for registration (/api/users)
router.post("/register", registerUser);
// POST for login (/api/users/login)
router.post("/login", loginUser);
// GET for current user (/api/users/current)
router.get("/current", validateToken, currentUser);
// PUT/DELETE for a specific user (/api/users/:id)
router.route("/:id").put(updateUser).delete(deleteUser);

// EXPORT ROUTER
module.exports = router;
