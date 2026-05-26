// CONTROLLER FÖR USER-ROUTES
// IMPORTS OF PACKAGES & DEPENDENCIES
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// IMPORT MODEL
const User = require("../models/userModel");

// CONTROLLER FUNCTIONS
// @desc Register a new user
// @route POST /api/users/register
// @access public (anyone should be able to register)
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    surname,
    email,
    postalAddress,
    postalCode,
    city,
    password,
  } = req.body; // Hämtar det som skrivs i body efter request
  // Validate input
  if (
    !firstname ||
    !surname ||
    !email ||
    !postalAddress ||
    !postalCode ||
    !city ||
    !password
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // Check if email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  // Hash the password and salt it appropriately (10 rounds)
  const hashedPassword = await bcrypt.hash(password, 10);
  // Log the hashed password
  console.log("Hashed password:", hashedPassword);

  // Create (instantiate) the user
  const user = await User.create({
    firstname,
    surname,
    email,
    postalAddress,
    postalCode,
    city,
    password: hashedPassword,
  });
  // ...and in the database (MongoDB)
  console.log(`User created: ${user}`);
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      postalAddress: user.postalAddress,
      postalCode: user.postalCode,
      city: user.city,
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
  const { email, password } = req.body;
  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // Check if user exists
  const userExists = await User.findOne({ email });
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
          name: userExists.name,
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
  res.status(200).json(req.user);
});

// EXPORT
module.exports = { registerUser, loginUser, currentUser };
