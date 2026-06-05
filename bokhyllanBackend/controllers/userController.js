// CONTROLLER FÖR USER-ROUTES
// IMPORTS OF PACKAGES & DEPENDENCIES
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// IMPORT MODEL
const User = require("../models/userModel");
const Order = require("../models/orderModel");

// CONTROLLER FUNCTIONS
// @desc Register a new user
// @route POST /api/users/register
// @access public (anyone should be able to register)
const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    firstname,
    surname,
    email,
    postalAddress,
    postalCode,
    city,
    phone,
    password,
  } = req.body; // Imports the data from the request body
  // Validate input
  if (
    !username ||
    !firstname ||
    !surname ||
    !email ||
    !postalAddress ||
    !postalCode ||
    !city ||
    !phone ||
    !password
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // Check if email already exists (unique emails required in model)
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("E-mail already exists");
  }
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }
  // Hash the password and salt it appropriately (10 rounds are not too much, but still secure)
  const hashedPassword = await bcrypt.hash(password, 10);
  // Log the hashed password
  console.log("Hashed password:", hashedPassword);

  // Create (instantiate) the user
  const user = await User.create({
    username,
    firstname,
    surname,
    email,
    postalAddress,
    postalCode,
    city,
    phone,
    password: hashedPassword,
  });
  // Log the created user (without password for security reasons)
  console.log(`User created: ${user}`);
  // Save the user in the database (MongoDB)
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      postalAddress: user.postalAddress,
      postalCode: user.postalCode,
      city: user.city,
      phone: user.phone,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// LOGIN
// @desc Login a user
// @route POST /api/users/login
// @access public (anyone should be able to login)
const loginUser = asyncHandler(async (req, res) => {
  // Get data from request body
  const { username, password } = req.body; // Changed from email to username
  // Validate input
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // Check if user exists
  const userExists = await User.findOne({ username: username });
  if (!userExists) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  // The password is hashed again before it is compared with the stored (previously hashed) password
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    // If correct --> Create a digital "pass", i.e., create a token with
    // 1) HEADER (algorithm type: jwt), 2) PAYLOAD (user id, email, expiration time)
    // ... and 3) SIGNATURE (server's cryptographic stamp, created with the secret key)
    const accessToken = jwt.sign(
      {
        // PAYLOAD 1 - User info
        user: {
          username: userExists.username,
          email: userExists.email,
          id: userExists.id,
        },
      },
      // SECRET
      process.env.ACCESS_TOKEN_SECRET,
      // PAYLOAD 2 - Expiration time
      { expiresIn: "15m" }, // Expires after 15 minutes
    );
    // Send the token back to the client
    res.status(200).json({ accessToken }); // Important for future requests that require authentication
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
// CURRENT USER
// @desc Get current user
// @route GET /api/users/current
// @access private (requires authentication, i.e., a valid token)
const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "username email postalAddress postalCode city phone firstname surname",
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    id: user.id,
    username: user.username,
    firstname: user.firstname,
    surname: user.surname,
    email: user.email,
    postalAddress: user.postalAddress,
    postalCode: user.postalCode,
    city: user.city,
    phone: user.phone,
  });
});

// FAVOURITES
// @desc Get favourites for current user
// @route GET /api/users/favourites
// @access private
const getFavourites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("favourites");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const favourites = Array.isArray(user.favourites) ? user.favourites : [];
  res.status(200).json({ favourites });
});

// @desc Add favourite ISBN for current user
// @route POST /api/users/favourites
// @access private
const addFavourite = asyncHandler(async (req, res) => {
  const isbnNumber = Number(req.body?.isbn);
  if (!Number.isFinite(isbnNumber)) {
    res.status(400);
    throw new Error("Valid isbn is required");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!Array.isArray(user.favourites)) {
    user.favourites = [];
  }

  if (!user.favourites.includes(isbnNumber)) {
    user.favourites.push(isbnNumber);
    await user.save();
  }

  res.status(200).json({ favourites: user.favourites });
});

// @desc Remove favourite ISBN for current user
// @route DELETE /api/users/favourites/:isbn
// @access private
const removeFavourite = asyncHandler(async (req, res) => {
  const isbnNumber = Number(req.params.isbn);
  if (!Number.isFinite(isbnNumber)) {
    res.status(400);
    throw new Error("Valid isbn is required");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!Array.isArray(user.favourites)) {
    user.favourites = [];
  }

  user.favourites = user.favourites.filter((isbn) => isbn !== isbnNumber);
  await user.save();

  res.status(200).json({ favourites: user.favourites });
});

// @desc Get user orders for current user
// @route GET /api/users/orders
// @access private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json(orders);
});

// EXPORT
module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getFavourites,
  addFavourite,
  removeFavourite,
  getUserOrders,
};
