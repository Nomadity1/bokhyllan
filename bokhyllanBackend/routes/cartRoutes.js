// IMPORTS OF PACKAGES & DEPENDENCIES
const express = require("express");

// IMPORT OF FUNCTION IN CONTROLLER
const { placeOrder } = require("../controllers/cartController");

// BUILD EXPRESS ROUTER
const router = express.Router();

// DEFINE ROUTES
router.post("/", placeOrder);

// EXPORT ROUTER
module.exports = router;
