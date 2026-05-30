// IMPORT OF PACKAGES & DEPENDENCIES
const express = require("express"); // Webb framework for Node.js
const dotenv = require("dotenv").config(); // Enable reading the dotenv-file
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing (CORS)
const { connect } = require("mongoose"); // ODM for MongoDB
const connectDB = require("./config/dbConnections"); // Import the function to connect to the database
const userRoutes = require("./routes/userRoutes"); // Import user routes

// CONNECT TO DATABASE
connectDB();

// BUILD EXPRESS APP
const app = express();

// USE CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server/tools without Origin header.
      if (!origin) return callback(null, true);

      const isLocalDevOrigin =
        /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\]):\d+$/.test(origin) ||
        /^https?:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d+$/.test(origin) ||
        /^https?:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(origin) ||
        /^https?:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}:\d+$/.test(
          origin,
        );
      // Godkänner lokala LAN-origins (192.168.x.x, 10.x.x.x, 172.16-31.x.x) och localhost
      // => appen fungerar oavsett om den öppnas via localhost-länk eller nätverkslänk
      if (isLocalDevOrigin) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);

// USE MIDDLEWARE
app.use(express.json()); // Parse JSON från requests

// USE ROUTES
app.use("/api/users", userRoutes);

// ADD CENTRAL ERROR HANDLING MIDDLEWARE?

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
