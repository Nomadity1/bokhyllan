// IMPORT OF PACKAGES & DEPENDENCIES
const express = require("express"); // Webb framework for Node.js
const dotenv = require("dotenv").config(); // Enable reading the dotenv-file

// BUILD EXPRESS APP
const app = express();

// Middleware
app.use(express.json()); // Parse JSON från requests
// Routes (placeholder)
app.get("/api/contacts", (req, res) => {
  res.status(200).json({ message: "Hello from contacts endpoint" });
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
