const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const validateToken = require("../middleware/validateTokenHandler");
const optionalToken = require("../middleware/optionalTokenHandler");

const router = express.Router();

router.post("/", optionalToken, createOrder);
router.get("/", validateToken, getOrders);

module.exports = router;
