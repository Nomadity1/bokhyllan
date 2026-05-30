// IMPORTS OF PACKAGES & DEPENDENCIES
const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

// IMPORT OF FUNCTIONS IN CONTROLLER
const {
  registerUser,
  loginUser,
  //   updateUser,
  //   deleteUser,
  currentUser,
  getFavourites,
  addFavourite,
  removeFavourite,
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
// FAVOURITES for current user
router.get("/favourites", validateToken, getFavourites);
router.post("/favourites", validateToken, addFavourite);
router.delete("/favourites/:isbn", validateToken, removeFavourite);
// PUT/DELETE for a specific user (/api/users/:id) - not implemented yet, but could be useful for future features like updating user info or deleting an account
// router.route("/:id").put(updateUser).delete(deleteUser);

// EXPORT ROUTER
module.exports = router;
