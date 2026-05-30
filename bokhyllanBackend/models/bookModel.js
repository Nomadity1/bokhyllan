// MODEL FOR A BOOK ITEM
// IMPORT OF PACKAGES & DEPENDENCIES
const mongoose = require("mongoose"); // Mongoose schema generates uniqe IDs for each book (can be used as Foreign Key)
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"], // Anpassat felmeddelande
    },
    author: {
      type: String,
      required: [true, "Please add an author"], // Anpassat felmeddelande
    },
    publicationYear: {
      type: Number,
      required: [true, "Please add a publication year"], // Anpassat felmeddelande
    },
    description: {
      type: String,
      required: [true, "Please add a description"], // Anpassat felmeddelande
    },
    mainCategory: {
      type: String,
      required: [true, "Please add a main category"], // Anpassat felmeddelande
    },
    subCategories: {
      type: [String], // Array av strängar för subkategorier
      required: [true, "Please add at least one subcategory"], // Anpassat felmeddelande
    },
    isbn: {
      type: Number,
      required: [true, "Please add an ISBN"], // Anpassat felmeddelande
      unique: [true, "ISBN must be unique"], // Gör så att varje ISBN måste vara unik
    },
    imgId: {
      type: String,
      required: [true, "Please add a cover image id"], // Anpassat felmeddelande
    },
    price: {
      type: Number,
      required: [true, "Please add a price"], // Anpassat felmeddelande
    },
  },
  { timestamps: true }, // Skapar automatiskt createdAt och updatedAt fält
);

module.exports = mongoose.model("Book", bookSchema);
