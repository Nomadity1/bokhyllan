// ROUTES FOR ORDERS
// IMPORTS OF PACKAGES & DEPENDENCIES
const express = require("express");
const { createOrder, getUserOrders } = require("../controllers/orderController");
const validateToken = require("../middleware/validateTokenHandler");
const optionalToken = require("../middleware/optionalTokenHandler");

// BUILD EXPRESS ROUTER
const router = express.Router();

// DEFINE ROUTES
// POST for creating a new order (/api/orders) - can be done by both authenticated users and guests (optionalToken middleware allows both)
router.post("/", optionalToken, createOrder);
// GET for retrieving orders - only for authenticated users (validateToken middleware ensures the user is logged in)
// router.get("/", validateToken, getOrders);
router.get("/current/orders", validateToken, getUserOrders);

// EXPORT ROUTER
module.exports = router;
