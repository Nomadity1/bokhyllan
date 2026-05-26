// DATABASE CONNECTION
// IMPORT OF PACKAGES & DEPENDENCIES
const mongoose = require("mongoose");

// FUNCTION TO CONNECT TO DATABASE
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connected ",
      conn.connection.host,
      conn.connection.name,
    );
  } catch (error) {
    console.log("Database connection error: ", error.message);
    process.exit(1); // Exit process with failure code
  }
};
// EXPORT THE FUNCTION to be used in server.js
module.exports = connectDB;
