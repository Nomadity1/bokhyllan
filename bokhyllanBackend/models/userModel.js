// MODEL FOR USER
// IMPORT OF PACKAGES & DEPENDENCIES
const mongoose = require("mongoose"); // Mongoose schema generates uniqe IDs for each user (can be used as Foreign Key)
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"], // Anpassat felmeddelande
      unique: [true, "Username must be unique"], // Gör så att varje username måste vara unik (eftersom det är det som används för inloggning)
    },
    firstname: {
      type: String,
      required: [true, "Please add a first name"], // Anpassat felmeddelande
    },
    surname: {
      type: String,
      required: [true, "Please add a surname"], // Anpassat felmeddelande
    },
    email: {
      type: String,
      required: [true, "Please add an email address"], // Anpassat felmeddelande
      unique: [true, "Email address must be unique"], // Gör så att varje email måste vara unik
    },
    postalAddress: {
      type: String,
      required: [true, "Please add a postal address"], // Anpassat felmeddelande
    },
    postalCode: {
      type: String,
      required: [true, "Please add a postal code"], // Anpassat felmeddelande
    },
    city: {
      type: String,
      required: [true, "Please add a city"], // Anpassat felmeddelande
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"], // Anpassat felmeddelande
    },
    password: {
      type: String,
      required: [true, "Please add a password"], // Anpassat felmeddelande
    },
    favourites: {
      type: [Number], // Array av ISBN-nummer (som är av typen Number)
      default: [],
    },
  },
  { timestamps: true }, // Skapar automatiskt createdAt och updatedAt fält
);

// Skapa en modell baserat på schemat
const User = mongoose.model("User", userSchema);
// Exportera modellen så att den kan användas i andra delar av applikationen (t.ex. i controllers)
module.exports = User;
