// CONTROLLER FUNCTIONS FOR ORDERS
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// HELPER FUNCTIONS
// Function to normalize order items from different request formats
// (either as an array of items or as individual fields for a single item)
function normalizeOrderItems(body) {
  if (Array.isArray(body.items) && body.items.length > 0) {
    return body.items;
  }
  if (body.isbn) {
    return [
      {
        isbn: body.isbn,
        title: body.title,
        author: body.author,
        quantity: body.quantity,
        price: body.price,
      },
    ];
  }
  return [];
}
// Function to calculate the total price of the cart based on the items and their quantities
function calculateCartTotal(items) {
  return items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Math.max(1, Number(item.quantity || 1)),
    0,
  );
}
// CONTROLLER FUNCTIONS
// CREATE ORDER (POST)
const createOrder = asyncHandler(async (req, res) => {
  const items = normalizeOrderItems(req.body).map((item) => ({
    isbn: Number(item.isbn),
    title: String(item.title || "").trim(),
    author: String(item.author || "").trim(),
    quantity: Math.max(1, Math.floor(Number(item.quantity || 1))),
    price: Number(item.price || 0),
  }));
  const { postalcode, city, postaladdress, email, phone } = req.body;
  if (!items.length) {
    res.status(400);
    throw new Error("Order must contain at least one item");
  }
  if (!postalcode || !city || !postaladdress || !email || !phone) {
    res.status(400);
    throw new Error("Missing required customer information");
  }
  if (
    items.some(
      (item) =>
        !Number.isFinite(item.isbn) ||
        !item.title ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        !Number.isFinite(item.quantity) ||
        item.quantity < 1,
    )
  ) {
    res.status(400);
    throw new Error("One or more order items are invalid");
  }
  const calculatedCartTotal = Number(calculateCartTotal(items).toFixed(2));
  const createdOrder = await Order.create({
    user: req.user?.id || null,
    items,
    cartTotal: calculatedCartTotal,
    postalCode: String(postalcode).trim(),
    city: String(city).trim(),
    postalAddress: String(postaladdress).trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone).trim(),
  });
  res.status(201).json({
    id: createdOrder.id,
    cartTotal: createdOrder.cartTotal,
    itemCount: createdOrder.items.length,
    createdAt: createdOrder.createdAt,
  });
});
// GET ORDERS FOR CURRENT USER (GET) - Requires authentication
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);
  res.status(200).json(orders);
});

module.exports = {
  createOrder,
  getUserOrders,
};
