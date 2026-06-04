// MODEL FOR ORDERS - DEFINES THE SCHEMA FOR ORDER DOCUMENTS IN MONGODB
// IMPORT OF PACKAGES & DEPENDENCIES
const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema(
  {
    isbn: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: "",
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);
// Instantiate main order schema
const orderSchema = new mongoose.Schema(
  {
    // Optional reference to a User (foreign key), can be null for guest checkouts
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, 
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "Order must contain at least one item",
      },
    },
    cartTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalAddress: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
