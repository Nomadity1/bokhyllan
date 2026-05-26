// IMPORT OF PACKAGES & DEPENDENCIES
const express = require("express"); // Webb framework for Node.js
const dotenv = require("dotenv").config(); // Enable reading the dotenv-file
const userRoutes = require("./routes/userRoutes"); // Import user routes

// BUILD EXPRESS APP
const app = express();

// USE MIDDLEWARE
app.use(express.json()); // Parse JSON från requests

// USE ROUTES
app.use("/api/users", userRoutes);

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
